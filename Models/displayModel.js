"use strict";

const db = require("./db");

// get each element from sql to be used in viewController.js
function getUrl(userID){
    const sql = `
        SELECT url
        FROM Posts
        WHERE contributor=@userID
        `;
    const stmt = db.prepare(sql);
    const record = stmt.get({userID});
    return record.url;
}

function getTitle(userID){
    const sql = `
        SELECT url
        FROM Posts
        WHERE contributor=@userID
        `;
    const stmt = db.prepare(sql);
    const record = stmt.get({userID});
    return record.title;
}

function getDescription(userID){
    const sql = `
        SELECT url
        FROM Posts
        WHERE contributor=@userID
        `;
    const stmt = db.prepare(sql);
    const record = stmt.get({userID});
    return record.desctiption;
}


// file とる

function getRundomSql(userID){
    const sql = `
        SELECT *
        FROM Posts
        ORDER BY RAND()
        LIMIT 5
        `;
    const stmt =db.prepare(sql);
    const record = stmt.get(userID);
    return record;
}

function removePost(userID){
    const sql = `
        DELETE *
        FROM Posts
        WHERE contributor=@userID
        `;
    const stmt = db.prepare(sql);
    stmt.run({
        "contributor": userID
    });
}

module.exports = {
    getUrl,
    getTitle,
    getDescription,
    getRundomSql,
    removePost,
};