"use strict";
const Joi = require("joi");

const validateOpt = {
	abortEarly: false,
	stripUnknown: true, 
	errors: {
		escapeHtml: true,
	}
};

const registerSchema = Joi.object({
    username:Joi.string()
        .min(3)
        .max(15)
        .token()
        .lowercase()
        .required(),

    password:Joi.string()
        .min(6)
        .required(),

    passwordConfirm:Joi.any()
        .valid(Joi.ref('password'))
        .required(),

    email:Joi.string()
        .email({ tlds: { allow: false } }),
        
    isCoach:Joi.number(),

    bio:Joi.string()
});

const loginSchema = Joi.object({
    username:Joi.string()
        .min(3)
        .max(15)
        .token()
        .lowercase()
        .required(),

    password:Joi.string()
        .min(6)
        .required()
});


function registerValidator(req, res, next) {
    const {value, error} = registerSchema.validate(req.body, validateOpt);
    
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }

    req.body = value;
    next();
}

function loginValidator(req, res, next) {
    const {value, error} = loginSchema.validate(req.body, validateOpt);
    
    if(error) {
        const errorMessages = error.details.map(detail => detail.message);
        return res.status(400).json({"errors":errorMessages});//Bad Request
    }

    req.body = value;
    next();
}

module.exports = {
    registerValidator,
    loginValidator
}