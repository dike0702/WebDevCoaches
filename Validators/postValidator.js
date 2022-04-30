"use strict";
const Joi = require("joi");

const validateOpt = {
	abortEarly: false,
	stripUnknown: true, 
	errors: {
		escapeHtml: true,
	}
};

const postSchema = Joi.object({
    url:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    title:Joi.string()
        .min(3)
        .max(30)
        .required(),


    description:Joi.string()
        .min(3)
        .max(255)
        .required()
});

const editPostSchema = Joi.object({
    reUrl:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    reTitle:Joi.string()
        .min(3)
        .max(30)
        .required(),


    reDesc:Joi.string()
        .min(3)
        .max(255)
        .required()
});

const reviewPostSchema = Joi.object({
    reason:Joi.string()
        .empty('')
});

const fileSchema = Joi.object({
    filename:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    mimetype:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    path:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)")),

    originalname:Joi.string()
        .pattern(new RegExp(
        "((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)"))
});


function uploadPostValidator(req, res, next) {
    const {value, error} = postSchema.validate(req.body, validateOpt);
    console.log("here");
    console.log(req.body);
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }
    
    req.body = value;
    next();
}

function fileValidator(req, res, next) {
    const {value, error} = fileSchema.validate(req.file, validateOpt);
    console.log("HERE");
    console.log(req.file);
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }

    req.file = value;
    next();
}

function editPostValidator(req, res, next) {
    const {value, error} = editPostSchema.validate(req.body, validateOpt);
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }
    
    req.body = value;
    next();
}

function reviewPostValidator(req, res, next){
    const {value, error} = reviewPostSchema.validate(req.body, validateOpt);
    if(error){
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});
    }
    req.body = value;
    next();
}

module.exports = {
    uploadPostValidator,
    fileValidator,
    editPostValidator,
    reviewPostValidator,
}