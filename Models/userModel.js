"use strict";

const db = require("./db");
const res = require("express/lib/response");
const crypto = require('crypto');
const argon2 = require('argon2');

async function addUser(username, password, email, isCoach) {
    try{
        const userId = crypto.randomUUID();
        const hash = await argon2.hash(password);
        const bio = "";
        const sqlUsersTable = `INSERT INTO Users(userid,username,passwordhash,email,isCoach,bio) VALUES (@userid, @username, @passwordhash, @email, @isCoach, @bio)`;
        const stmtUsersTable = db.prepare(sqlUsersTable);
        stmtUsersTable.run({
            "userid":userId,
            "username":username,
            "passwordhash":hash,
            "email":email,
            "isCoach" :isCoach,
            "bio": bio
        });
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

function getUserByUsername(username) {
    const sqlUsersTable = `SELECT * FROM Users WHERE username=@username`
    const stmtUsersTable = db.prepare(sqlUsersTable);
    const user = stmtUsersTable.get({"username":username});
    return user;  
}

function getUserByUserid(userid) {
    try {
        const sql = `SELECT * FROM Users WHERE userid=@userid`;
        const stmt = db.prepare(sql);
        const user = stmt.get({"userid":userid});
        return user;
    } catch(err) {
        console.error(err);
    }
    // if(!userid){
    //     return res.sendStatus(400);
    // }
    // const sqlUsersTable = `SELECT * FROM Users WHERE userid=@userid`
    // const stmtUsersTable = db.prepare(sqlUsersTable);
    // const user = stmtUsersTable.get({"userid": userid});
    // if(!user){
    //     return res.sendStatus(400);
    // }
    // return user;
}

function getAllDrawingUsers() {
    const sql = `SELECT * FROM Users JOIN drawingPosts ON Users.username=drawingPosts.contributer`;
    const stmt = db.prepare(sql);
    try {
        const users = stmt.all({});
        return users;
    } catch (err) {
        console.error(err);
        return false;
    }
}
function getAllGamingUsers() {
    const sql = `SELECT * FROM Users JOIN gamingPosts ON Users.username=gamingPosts.contributer`;
    const stmt = db.prepare(sql);
    try {
        const users = stmt.all({});
        return users;
    } catch (err) {
        console.error(err);
        return false;
    }
}
function getAllCookingUsers() {
    const sql = `SELECT * FROM Users JOIN cookingPosts ON Users.username=cookingPosts.contributer`;
    const stmt = db.prepare(sql);
    try {
        const users = stmt.all({});
        return users;
    } catch (err) {
        console.error(err);
        return false;
    }
}

function deleteUserbyUsername(username) {
    const sqlDrawingTable = `DELETE FROM drawingPosts WHERE contributer=@username`;
    const stmtDrawingTable = db.prepare(sqlDrawingTable);
    stmtDrawingTable.run({"username": username});

    const sqlGamingTable = `DELETE FROM gamingPosts WHERE contributer=@username`;
    const stmtGamingTable = db.prepare(sqlGamingTable);
    stmtGamingTable.run({"username": username});

    const sqlCookingTable = `DELETE FROM cookingPosts WHERE contributer=@username`;
    const stmtCookingTable = db.prepare(sqlCookingTable);
    stmtCookingTable.run({"username": username});

    const sqlReviewTable = `DELETE FROM Review WHERE reviewer=@username`;
    const stmtReviewTable = db.prepare(sqlReviewTable);
    stmtReviewTable.run({"username": username});

    const sqlUsersTable = `DELETE FROM Users WHERE username=@username`;
    const stmtUsersTable = db.prepare(sqlUsersTable);
    stmtUsersTable.run({"username": username});
}

function editUserByUsername(req, username){
    const email = req.body['email'];
    const bio   = req.body['bio'];
    const sqlUsersTable = `
        UPDATE Users 
        SET email=@email, bio=@bio
        WHERE username=@username
    `;
    db.prepare(sqlUsersTable).run({
        "username": username,
        "email": email,
        "bio": bio
    });
}

module.exports = {
    addUser,
    getUserByUsername,
    getUserByUserid,
    getAllCookingUsers,
    getAllDrawingUsers,
    getAllGamingUsers,
    deleteUserbyUsername,
    editUserByUsername
};