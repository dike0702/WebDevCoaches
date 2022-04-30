"use strict";

const directMessModel = require("../Models/directMessModel");

// 1. getMessage
// 2. send a message
// 3. delete a message

function getMessage (req, res){
    const chatID = req.body.chatid;
    //const messageID = req.body.message;
    if (!chatID){
        res.sendStatus(400);
    }
    const messages = directMessModel.getChat(chatID);
    const userid = req.session.user.userid;
    const chatroomInfo = {
        messages,
        userid
    };

    if (message){
        return res.render('chatIndex', chatroomInfo);
    }else{
        return res.sendStatus(409);//Conflict
    }
}

async function sendMessage(req, res){
    const chatID = req.body.chatid;
    if(await directMessModel.saveMessage(chatID)){
        return res.sendStatus(200);
    } else {
        return res.sendStatus(400);
    }
}

function deleteMessage(req, res){
    const chatID = req.body.chatid;
    const messageID = req.body.message;
    if(chatID && messageID)
    {
        directMessModel.deleteMessage(chatID, messageID);
        return res.sendStatus(200);
    }else{
        return res.sendStatus(409);//Conflict
    }
}

module.exports = {
    getMessage,
    sendMessage,
    deleteMessage
};