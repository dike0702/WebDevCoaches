"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const multer = require("multer");
const crypto = require('crypto');
const helmet = require("helmet");
const isProduction = process.env.NODE_ENV === "production";

/*Register Session Management*/
const redis = require('redis');
const session = require('express-session');
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const sessionConfig = {
  store: new RedisStore({ client: redisClient }),
  secret: process.env.COOKIE_SECRET, 
  resave: false,
  saveUninitialized: false,
  name: "session",
  isLoggedIn: false,
  cookie: {
    sameSite: isProduction,
    secure: isProduction,
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 8,
  }
};
app.use(session(sessionConfig));//session

app.use(express.urlencoded({extended: true}));
app.use(express.json({limit:200}));
app.use(express.static("public", {index: "index.html", extensions: ["html"]}));
app.use(express.static(__dirname + "/public"));
app.use(express.static("public/media/drawingVidImages"));
app.use(express.static("public/media/gamingVidImages"));
app.use(express.static("public/media/cookingVidImages"));

app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

const userController = require('./Controllers/userController');
const postController = require('./Controllers/postController');
const chatController = require('./Controllers/chatController');
const userValidator = require('./Validators/userValidator');
const postValidator = require('./Validators/postValidator');
const mailService = require("./mailService/mailService");
const viewController = require("./Controllers/viewController");
const {notFoundHandler, productionErrorHandler, catchAsyncErrors} = require("./utils/errorHandlers");

const fileOpts = {
  filename: function(req, file, cb) {
  const randomName = crypto.randomBytes(12).toString('hex');
  // Parse the extension from the file's original name
  const [extension] = file.originalname.split(".").slice(-1);
  // Now the random name preserves the file extension
  cb(null, `${randomName}.${extension}`);
  },
  fileFilter (req, file, cb) {      
  if (file.mimetype.startsWith("image/")) { //accept image file only
    return cb(null, true); // accept the file
  } else {
    return cb(null, false); // reject the file
  }
  }
};
const storageDrawing = multer.diskStorage({ destination:'public/media/drawingVidImages/', fileOpts});
const storageGaming = multer.diskStorage({ destination: 'public/media/gamingVidImages/', fileOpts });
const storageCooking = multer.diskStorage({ destination: 'public/media/cookingVidImages/', fileOpts });

const drawingVidImage = multer({ storage:storageDrawing});
const gamingVidImage = multer({ storage:storageGaming});
const cookingVidImage = multer({ storage:storageCooking});

// user registration
app.post("/api/register", userValidator.registerValidator, userController.createNewUser);
app.post("/api/login", userValidator.loginValidator, userController.login);
app.get("/logout",userController.logOut);

// Input and Output for Drawing, Gaming, and Cooking
app.get("/drawing", catchAsyncErrors(viewController.getDrawing));
app.get("/gaming", catchAsyncErrors(viewController.getGaming));
app.get("/cooking", catchAsyncErrors(viewController.getCooking));
app.post("/api/drawingUpload",drawingVidImage.single('drawingVidImage'), 
    postValidator.uploadPostValidator, postController.drawingUpload);
app.post("/api/gamingUpload",gamingVidImage.single('gamingVidImage'), 
    postValidator.uploadPostValidator, postController.gamingUpload);
app.post("/api/cookingUpload",cookingVidImage.single('cookingVidImage'), 
    postValidator.uploadPostValidator, postController.cookingUpload);

// PROFILE
app.get("/user/profile/:contributer/:type", catchAsyncErrors(viewController.getProfileForContributor));

// All Coaches each genre and thier profile
app.get("/user/drawing", catchAsyncErrors(viewController.AllDrawingCoaches));
app.get("/user/gaming", catchAsyncErrors(viewController.AllGamingCoaches));
app.get("/user/cooking", catchAsyncErrors(viewController.AllCookingCoaches));
app.get("/user/profile/:username/:type", catchAsyncErrors(viewController.getProfileForUsername));

// MYPAGE
app.get("/mypage/drawing", catchAsyncErrors(viewController.mypageDrawing));
app.get("/mypage/gaming", catchAsyncErrors(viewController.mypageGaming));
app.get("/mypage/cooking", catchAsyncErrors(viewController.mypageCooking));

// Edit post 
app.get("/public/:username/:postid/:type", catchAsyncErrors(viewController.editPosts));

//Post method for edit post
app.post("/drawing/:username/:postid/edit", drawingVidImage.single('reImage'), postController.editDrawingPost);
app.post("/gaming/:username/:postid/edit", gamingVidImage.single('reImage'), postController.editGamingPost);
app.post("/cooking/:username/:postid/edit", cookingVidImage.single('reImage'), postController.editCookingPost);
app.post("/public/:postid/:type/edit", postValidator.editPostValidator, postController.updatePost);

// DELETE VIDEO
app.get("/public/delete/:postid/:type", catchAsyncErrors(viewController.deletePost));

// USER
// edit and delete users
app.post("/api/edit/:username/:type", userController.editUser);
app.get("/delete/:username", userController.deleteUser);
// to edit user info
app.get("/edit/:username/:type", viewController.editPage);

// REVIEW
// review page
app.get("/review/:postid", catchAsyncErrors(viewController.reviewPage));
app.post("/api/review/:postid/post", postValidator.reviewPostValidator, viewController.addReview);
app.get("/postReview/:postid", catchAsyncErrors(viewController.renderReview));

// CHAT
// app.get("/chat/:postid/:type", catchAsyncErrors(viewController.chatPage));
// app.post("/api/chat/:postid", chatController.addChat);

app.use(notFoundHandler);

if(isProduction) {
  app.set('trust proxy',1);
  app.use(helmet());
  app.use(productionErrorHandler);
}

module.exports = app;