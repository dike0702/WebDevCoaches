"use strict";

const { sendStatus } = require("express/lib/response");
const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");

async function drawingUpload(req, res){
    if(!req.session.isLoggedIn) {
        return res.redirect(403,"/drawing");//Forbidden
    }
    const user = userModel.getUserByUsername(req.session.user.username);
    const isCoach = user.isCoach;
    if(!isCoach){
        return res.sendStatus(401);//Unauthorized
    }

    const userID = req.session.user.userID;
    
    if(await postModel.addDrawingPost(req, res, userID)){
        return res.redirect("/drawing");
    } else {
        return res.sendStatus(400);
    }
}
async function gamingUpload(req, res){
    if(!req.session.isLoggedIn) {
        return res.redirect(403,"/gaming");//Forbidden
    }
    const user = userModel.getUserByUsername(req.session.user.username);
    const isCoach = user.isCoach;
    if(!isCoach){
        return res.sendStatus(401);//Unauthorized
    }

    const userID = req.session.user.userID;
    
    if(await postModel.addGamingPost(req, res, userID)){
        return res.redirect("/gaming");
    } else {
        return res.sendStatus(400);
    }
}
async function cookingUpload(req, res){
    if(!req.session.isLoggedIn) {
        return res.redirect(403,"/cooking");//Forbidden
    }
    const user = userModel.getUserByUsername(req.session.user.username);
    const isCoach = user.isCoach;
    if(!isCoach){
        return res.sendStatus(401);//Unauthorized
    }

    const userID = req.session.user.userID;
    
    if(await postModel.addCookingPost(req, res, userID)){
        return res.redirect("/cooking");
    } else {
        return res.sendStatus(400);
    }
}

async function editGamingPost(req, res) {
    const username = req.params.username;
    if (req.session.user.username !== username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    const post = postModel.getGamingPostByPostId(postid);
    if(post.contributer === username){
        if(await postModel.updateGamingPost(req, res, postid)) {
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(400);
        }
    }
}
async function editCookingPost(req, res) {
    const username = req.params.username;
    if (req.session.user.username !== username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    const post = postModel.getCookingPostByPostId(postid);
    if(post.contributer === username){
        if(await postModel.updateCookingPost(req, res, postid)) {
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(400);
        }
    }
}
async function editDrawingPost(req, res) {
    const username = req.params.username;
    if (req.session.user.username !== username) {
        return res.sendStatus(403);
    }
    const postid = req.params.postid;
    const post = postModel.getDrawingPostByPostId(postid);
    if(post.contributer === username){
        if(await postModel.updateDrawingPost(req, res, postid)) {
            return res.sendStatus(200);
        } else  {
            return res.sendStatus(400);
        }
    }
}

async function reviewUpload(req, res){
    const userID = req.session.user.userID;
    const postid = req.params['postid'];

    await postModel.addReview(req, res, userID, postid);
    const url = "/review/" + postid;
    res.redirect(url);
}

async function updatePost(req, res){
    const{title, description} = req.body;
    const postid = req.params['postid'];
    const type = req.params['type'];
    const url = "/mypage/" + type;
    if(type === "drawing"){
        postModel.updateDrawing(title, description, postid);
        res.redirect(url);
    } else if(type === "gaming"){
        postModel.updateGaming(title, description, postid);
        res.redirect(url);
    } else if(type === "cooking"){
        postModel.updateCooking(title, description, postid);
        res.redirect(url);
    }
}

module.exports = {
    drawingUpload,
    gamingUpload,
    cookingUpload,
    editGamingPost,
    editCookingPost,
    editDrawingPost,
    reviewUpload,
    updatePost,
};