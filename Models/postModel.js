"use strict";

const db = require("./db");
const userModel = require("./userModel");
const crypto = require("crypto");

async function addDrawingPost(req, res, userID){
    const postid = crypto.randomBytes(12).toString('hex');
    const user = userModel.getUserByUserid(userID);
    const username = user.username;
    const email = user.email;
    const url       = req.body.url;
    const title       = req.body.title;
    const description = req.body.description;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `
        INSERT INTO drawingPosts
        (postid,contributer, email, url, title, description, filename, mimetype, path, originalName) 
        VALUES
        (@postid,@username, @email, @url, @title, @description, @filename, @mimetype, @path, @originalName)
        `;

    const stmt = db.prepare(sql);
    try{
        stmt.run({
            "postid":postid,
            username,
            "email": email,
            "url": url,
            "title": title,
            "description": description,
            "filename": filename,
            "mimetype":mimetype,
            "path":path,
            "originalName": originalName
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}
async function addGamingPost(req, res, userID){
    const postid = crypto.randomBytes(12).toString('hex');
    const user = userModel.getUserByUserid(userID);
    const username = user.username;
    const email = user.email;
    const url       = req.body.url;
    const title       = req.body.title;
    const description = req.body.description;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `
        INSERT INTO gamingPosts
        (postid,contributer, email, url, title, description, filename, mimetype, path, originalName) 
        VALUES
        (@postid,@username, @email, @url, @title, @description, @filename, @mimetype, @path, @originalName)
        `;

    const stmt = db.prepare(sql);
    try{
        stmt.run({
            "postid":postid,
            username,
            "email":email,
            "url": url,
            "title": title,
            "description": description,
            "filename": filename,
            "mimetype":mimetype,
            "path":path,
            "originalName": originalName
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}

async function addCookingPost(req, res, userID){
    const postid = crypto.randomBytes(12).toString('hex');
    const user = userModel.getUserByUserid(userID);
    const username = user.username;
    const email = user.email;
    const url       = req.body.url;
    const title       = req.body.title;
    const description = req.body.description;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `
        INSERT INTO cookingPosts
        (postid,contributer, email, url, title, description, filename, mimetype, path, originalName) 
        VALUES
        (@postid,@username, @email, @url, @title, @description, @filename, @mimetype, @path, @originalName)
        `;

    const stmt = db.prepare(sql);
    try{
        stmt.run({
            "postid":postid,
            username,
            "email":email,
            "url": url,
            "title": title,
            "description": description,
            "filename": filename,
            "mimetype":mimetype,
            "path":path,
            "originalName": originalName
        });
        return true;
    } catch(err){
        console.error(err);
        return false;
    }
}

async function addReview(req, res, userID, postid){
    const user = userModel.getUserByUserid(userID);
    const username = user.username;
    const rate   = req.body.rate;
    const reason = req.body.reason;
    const id = postid;
    
    const sql = `
        INSERT INTO Review
        (reviewer, postid, rate, reason)
        VALUES
        (@username, @postid, @rate, @reason)
    `;
    const stmt = db.prepare(sql);
    stmt.run({
        "username": username,
        "postid": id,
        "rate": rate,
        "reason": reason
    });
}

function getAllDrawingPosts(){
    const sql = `SELECT * FROM drawingPosts`;
    const stmt = db.prepare(sql);
    try{
        return stmt.all();
    } catch(err) {
        console.error(err);
    }
}

function getAllGamingPosts(){
    const sql = `SELECT * FROM gamingPosts`;
    const stmt = db.prepare(sql);
    try{
        return stmt.all();
    } catch(err) {
        console.error(err);
    }
}

function getAllCookingPosts(){
    const sql = `SELECT * FROM cookingPosts`;
    const stmt = db.prepare(sql);
    try{
        return stmt.all();
    } catch(err) {
        console.error(err);
    }
}

function getAllDrawPostsByUsername(username){
    const sql = `SELECT * FROM drawingPosts WHERE contributer=@username`;
    const postList = db.prepare(sql).all({username});
    try {
        return postList;
    } catch(err) {
        console.error(err);
    }
}
function getAllGamePostsByUsername(username){
    const sql = `SELECT * FROM gamingPosts WHERE contributer=@username`;
    const postList = db.prepare(sql).all({username});
    try {
        return postList;
    } catch(err) {
        console.error(err);
    }
}
function getAllCookPostsByUsername(username){
    const sql = `SELECT * FROM cookingPosts WHERE contributer=@username`;
    const postList = db.prepare(sql).all({username});
    try {
        return postList;
    } catch(err) {
        console.error(err);
    }
}

function getAllDrawPostsByPostId(postid){
    const sql = `SELECT * FROM drawingPosts WHERE postid=@postid`;
    const postList = db.prepare(sql).get({postid});
    try {
        return postList;
    } catch(err) {
        console.error(err);
    }
}
function getAllGamePostsByPostId(postid){
    const sql = `SELECT * FROM gamingPosts WHERE postid=@postid`;
    const postList = db.prepare(sql).get({postid});
    try {
        return postList;
    } catch(err) {
        console.error(err);
    }
}
function getAllCookPostsByPostId(postid){
    const sql = `SELECT * FROM cookingPosts WHERE postid=@postid`;
    const postList = db.prepare(sql).get({postid});
    try {
        return postList;
    } catch(err) {
        console.error(err);
    }
}


function getReviewByPostid(postid){
    const sql = `SELECT * FROM Review WHERE postid = @postid`;
    const record = db.prepare(sql).all({postid});
    try{
        return record;
    } catch(err){
        console.error(err);
    }
}

async function updateGamingPost (req, res, postid) {
    const reTitle = req.body.reTitle;
    const reDesc = req.body.reDesc;
    const reUrl = req.body.reUrl;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `UPDATE gamingPosts SET title=@title, description=@description, url=@url, filename=@filename, mimetype=@mimetype, path=@path, originalName=@originalName
                WHERE postid=@postid`;
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "title":reTitle,
            "description":reDesc,
            "url":reUrl,
            "filename":filename,
            "mimetype":mimetype,
            "path":path,
            "originalName":originalName,
            "postid":postid
        })
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
async function updateCookingPost (req, res, postid) {
    const reTitle = req.body.reTitle;
    const reDesc = req.body.reDesc;
    const reUrl = req.body.reUrl;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `UPDATE cookingPosts SET title=@title, description=@description, url=@url, filename=@filename, mimetype=@mimetype, path=@path, originalName=@originalName
                WHERE postid=@postid`;
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "title":reTitle,
            "description":reDesc,
            "url":reUrl,
            "filename":filename,
            "mimetype":mimetype,
            "path":path,
            "originalName":originalName,
            "postid":postid
        })
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
async function updateDrawingPost (req, res, postid) {
    const reTitle = req.body.reTitle;
    const reDesc = req.body.reDesc;
    const reUrl = req.body.reUrl;
    const filename = req.file.filename;
    const mimetype = req.file.mimetype;
    const path = req.file.path;
    const originalName = req.file.originalname;

    const sql = `UPDATE drawingPosts SET title=@title, description=@description, url=@url, filename=@filename, mimetype=@mimetype, path=@path, originalName=@originalName
                WHERE postid=@postid`;
    try{
        const stmt = db.prepare(sql);
        stmt.run({
            "title":reTitle,
            "description":reDesc,
            "url":reUrl,
            "filename":filename,
            "mimetype":mimetype,
            "path":path,
            "originalName":originalName,
            "postid":postid
        })
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

function getGamingPostByPostId(postid){
    const sql = `SELECT * FROM gamingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        const post = stmt.get({"postid":postid});
        return post;
    } catch (err) {
        console.error(err);
    }
}

function getDrawingPostByPostId(postid){
    const sql = `SELECT * FROM drawingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        const post = stmt.get({"postid":postid});
        return post;
    } catch(err) {
        console.error(err);
    }
}
function getCookingPostByPostId(postid){
    const sql = `SELECT * FROM cookingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        const post = stmt.get({"postid":postid});
        return post;
    } catch(err) {
        console.error(err);
    }
}

// delete videos
function deleteDrawingByPostid(postid){
    const sql = `DELETE FROM drawingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        stmt.run({postid});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
function deleteGamingByPostid(postid){
    const sql = `DELETE FROM gamingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        stmt.run({postid});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}
function deleteCookingByPostid(postid){
    const sql = `DELETE FROM cookingPosts WHERE postid=@postid`;
    const stmt = db.prepare(sql);
    try {
        stmt.run({postid});
        return true;
    } catch(err) {
        console.error(err);
        return false;
    }
}

module.exports = {
    addDrawingPost,
    addGamingPost,
    addCookingPost,
    addReview,

    getAllCookingPosts,
    getAllDrawingPosts,
    getAllGamingPosts,

    getAllDrawPostsByUsername,
    getAllGamePostsByUsername,
    getAllCookPostsByUsername,

    getAllDrawPostsByPostId,
    getAllGamePostsByPostId,
    getAllCookPostsByPostId,
    getReviewByPostid,

    updateCookingPost,
    updateDrawingPost,
    updateGamingPost,

    getCookingPostByPostId,
    getDrawingPostByPostId,
    getGamingPostByPostId,
    
    deleteDrawingByPostid,
    deleteGamingByPostid,
    deleteCookingByPostid
};
