"use strict";
const userModel = require("../Models/userModel");
const argon2 = require('argon2');
const mailService = require("../mailService/mailService");
const { redirect } = require("express/lib/response");


async function createNewUser(req, res) {
    const {username, password, email} = req.body;
    let isCoach = req.body.isCoach;
    let isNewsLetter = req.body.isNewsLetter;
    if(!isCoach){
        isCoach = 0;
    }
    const create = await userModel.addUser(username, password, email, isCoach);
    if(create){
        if(isNewsLetter){
            await mailService.sendNewsLetter(email);
        }
        res.redirect(201, "/login");
    } else {
        return res.sendStatus(409);//Conflict
    }
}

async function login(req, res) {
    const {username, password} = req.body;
    const user = userModel.getUserByUsername(username);
    if(!user) {
        return res.sendStatus(400);//Bad Request
    } 
    const {passwordhash} = user;
    if(await argon2.verify(passwordhash, password)) {
        req.session.regenerate((err) => {
            if(err) {
                console.error(err);
                return res.sendStatus(500);//Internal Server Error
            } 
            req.session.user = {};
            req.session.user.username = username;
            req.session.user.userID = user.userid;
            req.session.isLoggedIn = true;
            if(user.isCoach){
                req.session.role = 1;//Differenciate normal user and coach
            }
            return res.sendStatus(200);//OK
        });
    } else {
        return res.sendStatus(400);//Bad Request
    }
    
}

function logOut(req, res) {
    if(req.session.user && req.session.isLoggedIn){
        req.session.destroy();
        res.redirect("/login");
    }
}

function editUser(req, res){
    const username = req.params['username'];
    const type = req.params['type'];
    const url = "/mypage/" + type;
    try{
        userModel.editUserByUsername(req, username);
        res.redirect(url);
    } catch(err){
        res.sendStatus(400);
    }
}

function deleteUser(req, res){
    const username = req.params['username'];
    try{
        userModel.deleteUserbyUsername(username);
        res.redirect("/register");
    } catch(err){
        res.sendStatus(400);
    }
}

module.exports = {
    createNewUser,
    login,
    logOut,
    editUser,
    deleteUser
}