"use strict";

//const e = require("express");
const db = require("./db");

const userModel = require("./userModel");
//コーチ目線
// function getUser(coachID){
//     const sql = `
//     SELECT user FROM Chat
//     WHERE coach=@coachid
//     `
//     const stmt = db.prepare(sql);
//     const users = stmt.get({coachID});
//     return users;
// }

// //ユーザー目線
// function getCoachUser(userID){
//     const sql = `
//     SELECT coach FROM Chat
//     WHERE user=@userID
//     `
//     const stmt = db.prepare(sql);
//     const coaches = stmt.get({userID});
//     return coaches;
// }

// function getCoachByEmail(email){
//     const sql = `
//     SELECT userid FROM Users
//     WHERE email=@email
//     `
//     const stmt = db.prepare(sql);
//     const id = stmt.get({email});
//     return id;
// }

// function createChat(coachID, userID, postID){
//     const sql_count_before = `
//     select count(*) 
//     FROM Chat
//     `
//     const stmt_1 = db.prepare(sql_count_before);
//     const count_before = stmt_1.get();

//     //console.log(userID, coachID, postID);
//     console.log(coachID);
//     const sql = `
//     INSERT INTO Chat
//     (user, coach, postid)
//     VALUES
//     (@user, @coach, @postid)`;
//     const stmt = db.prepare(sql);
//     stmt.run({
//         "user": userID,
//         "coach": coachID,
//         "postid": postID
//     });

//     const sql_count_after = `
//     select count(*) 
//     FROM Chat
//     `
//     const stmt_2 = db.prepare(sql_count_after);
//     const count_after = stmt_2.get();

//     if(count_before === count_after) {
//         console.log("distinct")
//         return false;
//     }else{
//         console.log("created");
//         return true;
//     }
// }

// function getChatRoom(coachID, userID, postID){
//     const sql = `
//     SELECT * FROM Chat
//     WHERE coach=@coachID AND user=@userID AND postid=@postID
//     `;
//     const stmt = db.prepare(sql);
//     const chat = stmt.get({
//         "coachID" : coachID,
//         "userID" : userID,
//         "postID" : postID
//     });
//     // try{
//     //     return chatID;
//     // } catch(err){
//     //     console.error(err);
//     // }
//     return chat;
//     //console.log("aaaa  ", chatID );
// }

function createChat(postid, message, type, username){
    // const user = userModel.getUserByUserid(userid);
    // const username = user.username;

    const sql = `
        INSERT INTO Chat
        (postid, username, message)
        VALUES
        (@postid, @username, @message)
        `;
    const stmt = db.prepare(sql);
    stmt.run({
        "postid": postid,
        "username": username,
        "message": message
    });
    // try{
    //     stmt.run({
    //         "postid": postid,
    //         "username": username,
    //         "message": message
    //     });
    // } catch(err){
    //     return falsef;
    // }
}

function getAllChatByPostid(postid){
    const sql = `SELECT * FROM Chat WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    const chat = stmt.get({
        "postid": postid
    });
    console.log(chat);
}

module.exports = {
    // getUser,
    // getCoachUser,
    // createChat,
    // getChatRoom,
    // getCoachByEmail,
    createChat,
    getAllChatByPostid
};
