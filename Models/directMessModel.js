"use strict";

const db = require("./db");
const userModel = require("./userModel");

function getChat (chatID){
    const sql = `
    SELECT * FROM Directmess
    WHERE chatid=@chatID
    `
    const stmt = db.prepare(sql);
    const chatLog = stmt.get({chatID});
    return chatLog;
}

function saveMessage(chatID){
    const user = userModel.getUserByUserid(userID);
    //const username = user.username;
    const message = req.body.message;
    const sql = `
        INSERT INTO DirectMess
        (touser, fromuser, chatid, messgae)
        VALUES
        (@touser, @fromuser, @chatid, @message)
        `;
    const stmt = db.prepare(sql);
    try{
        stmt.run({
            "username": user,
            "username": user,
            "chatid"  : chatID,
            "message" : message
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
    // const sql = `
    // SELECT * FROM Directmess
    // WHERE chatid=@chatID
    // `
    // const stmt = db.prepare(sql);
    // const messages = stmt.get({chatID});
    // return messages;
}

function deleteMessage(chatID, messageID){
    const sql = `
    DELETE * FROM Directmess
    WHERE chatid=@chatID, id=@messageID
    `
    const stmt = db.prepare(sql);
    stmt.run({
        "chatid": chatID,
        "id": messageID
    });
}

module.exports = {
    getChat,
    saveMessage,
    deleteMessage
}