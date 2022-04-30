"use strict";

const postModel = require("../Models/postModel");
const userModel = require("../Models/userModel");
const chatModel = require("../Models/chatModel");
const postController = require("./postController");

async function getDrawing(req, res){
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
    }
    const allData = postModel.getAllDrawingPosts();
    res.render("index", {allData:allData, req, type:"drawing"});
}
async function getGaming(req, res){
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
    }
    const allData = postModel.getAllGamingPosts();
    res.render("index", {allData:allData, req, type:"gaming"});
}
async function getCooking(req, res){
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
    }
    const allData = postModel.getAllCookingPosts();
    res.render("index", {allData:allData, req, type:"cooking"});
}

async function getProfileForContributor(req, res){
    const username = req.params['contributer'];
    const type = req.params['type'];
    const userInfo = userModel.getUserByUsername(username);
    if(type === "drawing"){
      const allPosts = postModel.getAllDrawPostsByUsername(username);
      res.render("profile", {user:userInfo, allPosts});
    } else if(type === "gaming"){
      const allPosts = postModel.getAllGamePostsByUsername(username);
      res.render("profile", {user:userInfo, allPosts});
    } else if(type === "cooking"){
      const allPosts = postModel.getAllCookPostsByUsername(username);
      res.render("profile", {user:userInfo, allPosts});
    }
}
async function getProfileForUsername(req, res){
    const username = req.params['username'];
    const type = req.params['type'];
    const userInfo = userModel.getUserByUsername(username);
    if(type === "drawing"){
      const allPosts = postModel.getAllDrawPostsByUsername(username);
      res.render("profile", {user:userInfo, allPosts});
    } else if(type === "gaming"){
      const allPosts = postModel.getAllGamePostsByUsername(username);
      res.render("profile", {user:userInfo, allPosts});
    } else if(type === "cooking"){
      const allPosts = postModel.getAllCookPostsByUsername(username);
      res.render("profile", {user:userInfo, allPosts});
    }
}

async function AllDrawingCoaches (req, res){
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const type = "drawing";
      const users = userModel.getAllDrawingUsers();
      res.render("seeAllCoaches", {users, type});
}
async function AllGamingCoaches (req, res){
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const type = "gaming";
      const users = userModel.getAllGamingUsers();
      res.render("seeAllCoaches", {users, type});
}
async function AllCookingCoaches (req, res){
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
      }
      const type = "cooking";
      const users = userModel.getAllCookingUsers();
      res.render("seeAllCoaches", {users, type});
}

async function mypageDrawing(req, res){
    const username = req.session.user.username;
    const user = userModel.getUserByUsername(username);
    const allPosts = postModel.getAllDrawPostsByUsername(username);
    res.render("userIndex", {user, allPosts, req, type:"drawing"});
}
async function mypageGaming(req, res){
    const username = req.session.user.username;
    const user = userModel.getUserByUsername(username);
    const allPosts = postModel.getAllGamePostsByUsername(username);
    res.render("userIndex", {user, allPosts, req, type:"gaming"});
}
async function mypageCooking(req, res){
    const username = req.session.user.username;
    const user = userModel.getUserByUsername(username);
    const allPosts = postModel.getAllCookPostsByUsername(username);
    res.render("userIndex", {user, allPosts, req, type:"cooking"});
}

async function editPosts(req, res){
    const postid = req.params['postid'];
    const type = req.params['type'];
    const username = req.params['username'];
    if(type === "drawing"){
      const post = postModel.getAllDrawPostsByPostId(postid);
      res.render("editPage", {post, username, type});
    } else if(type === "gaming"){
      const post = postModel.getAllGamePostsByPostId(postid);
      res.render("editPage", {post, username, type});
    } else if(type === "cooking"){
      const post = postModel.getAllCookPostsByPostId(postid);
      res.render("editPage", {post, username, type});
    }
}

async function deletePost(req, res){
    const postid = req.params['postid'];
    const type   = req.params['type'];
    const url = "/mypage/" + type;
    if(type === "drawing"){
        postModel.deleteDrawingByPostid(postid);
        res.redirect(url);
    } else if(type === "gaming"){
        postModel.deleteGamingByPostid(postid);
        res.redirect(url);
    } else if(type === "cooking"){
        postModel.deleteCookingByPostid(postid);
        res.redirect(url);
    }
}

async function editPage(req, res){
    const username = req.params['username'];
    const type = req.params['type'];
    const user = userModel.getUserByUsername(username);
    res.render("userEditPage", {user, type});
}

async function reviewPage(req, res){
    const postid = req.params['postid'];
    const allreview = postModel.getReviewByPostid(postid);
    res.render("reviewIndex", {data:allreview, req, postid});
}

async function addReview(req, res){
    const postid = req.params['postid'];
    postController.reviewUpload(req, res); 
    const url = "/review/" + postid;
    res.redirect(url);   
}

async function renderReview(req, res){
    const postid = req.params['postid'];
    res.render("postReview", {postid});
}

async function chatPage(req, res){
    const username = req.params["username"];
    const user = userModel.getUserByUsername(username);
    const postid = req.params["postid"];
    const allChat = chatModel.getAllChatByPostid(postid);
    const type = req.params["type"];
    res.render("chatIndex", {user, chat:allChat, postid, type});
}

module.exports = {
    getDrawing,
    getGaming,
    getCooking,
    getProfileForContributor,
    getProfileForUsername,
    AllDrawingCoaches,
    AllGamingCoaches,
    AllCookingCoaches,
    mypageDrawing,
    mypageGaming,
    mypageCooking,
    editPosts,
    deletePost,
    editPage,
    reviewPage,
    addReview,
    renderReview,
    chatPage,
}