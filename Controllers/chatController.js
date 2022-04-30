"use strict";

const { type } = require("express/lib/response");
//const { response } = require("../app");
const userModel = require("../Models/userModel");
const chatModel = require("../Models/chatModel");
const { getUserByUserid } = require("../Models/userModel");
// const userModel = require("../Models/userModel");

//コーチ目線
// function chatByCoach (req, res){
//     let coachID;
//     console.log("yuto");
//     if (req.session.user.isCoach){
//         coachID = req.session.user.userid;
//     }else{
//         res.sendStatus(400);
//     }
//     let users = chatModel.getUser(coachID);
//     console.log(users);
//     return res.render("/chatIndex", users);
// }

// //ユーザー目線
// function chatByUser (req, res){
//     let userID;
//     if (!req.session.user.isCoach){
//         userID = req.session.user.userid;
//     }else{
//         res.sendStatus(400);
//     }
//     let coaches = chatModel.getCoachUser(userID);
//     return res.render("/chatIndex", coaches);
// }

// //チャット作成
// function createChatRoom (req, res){
//     if (!req.session.isLoggedIn){
//         //コメント追加必要
//         res.render(201, "/login");
//     }
//     //requestからコーチID
//     const coachID = chatModel.getCoachByEmail(req.params.email).userid;
//     const userID = req.session.user.userID;
//     const postID = req.params.postid;

//     if(chatModel.createChat(coachID, userID, postID) === false ){
//         const data = chatModel.getChatRoom(coachID, userID, postID);
//         //res.render('/chat', data); //append render 
//         res.render("chatIndex", data);
//         //return res.sendStatus(403);
//     }else{ // === 0 not exists
//         // users = chatModel.getUser(coachID);
//         // coaches = chatModel.getCoachUser(userID);
//         const data = {
//             coachID,
//             userID,
//             postID
//         }
//         // var form = $('chatLog.json');                     //値を保存しておきたいフォーム
//         // var formData = form.serializeArray();         //serializeArray()でフォームの内容をオブジェクト化
//         // var formJson = JSON.stringify(formData);
//         // localStorage.setItem('form_data', formJson);
//         // var localData = localStorage.getItem('form_data');// ローカルストレージの値を取り出すコード
//         // localData = JSON.parse(localData);//ローカルデータから取得したJSONデータをオブジェクトへ戻す
//         //res.redirect(201, "/chat"); //fix
//         res.render("chatIndex", data);
//         //return res.sendStatus(200);
//     }
// }

function addChat(req, res){
    const postid = req.params["postid"];
    const type = req.params["type"];
    const message = req.body['message'];
    const user = userModel.getUserByUserid(req.session.user.userID);
    const username = user.username;
    chatModel.createChat(postid, message, type, username);
    // const url = "chat" + postid + type;
    // res.redirect(url);
    res.sendStatus(200);
}

module.exports = {
    addChat,
    // chatByCoach,
    // chatByUser,
    // createChatRoom
}
