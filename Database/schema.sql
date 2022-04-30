-- Drop table Chat;
CREATE TABLE IF NOT EXISTS Users (
    userid TEXT UNIQUE PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    passwordhash TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    isCoach INTEGER NOT NULL DEFAULT 0,
    bio TEXT
);

CREATE TABLE IF NOT EXISTS drawingPosts (
    postid       TEXT UNIQUE PRIMARY KEY,
    contributer  TEXT NOT NULL,
    email        TEXT NOT NULL,
    url          TEXT NOT NULL,
    title        TEXT NOT NULL,
    description  TEXT NOT NULL,
    filename     TEXT UNIQUE NOT NULL,
    mimetype     TEXT NOT NULL,
    path         TEXT UNIQUE NOT NULL,
    originalname TEXT NOT NULL,
    FOREIGN Key (contributer) REFERENCES Users(username)
);

CREATE TABLE IF NOT EXISTS gamingPosts (
    postid       TEXT UNIQUE PRIMARY KEY,
    contributer  TEXT NOT NULL,
    email        TEXT NOT NULL,
    url          TEXT NOT NULL,
    title        TEXT NOT NULL,
    description  TEXT NOT NULL,
    filename     TEXT UNIQUE NOT NULL,
    mimetype     TEXT NOT NULL,
    path         TEXT UNIQUE NOT NULL,
    originalname TEXT NOT NULL,
    FOREIGN Key (contributer) REFERENCES Users(username)

);

CREATE TABLE IF NOT EXISTS cookingPosts (
    postid       TEXT UNIQUE PRIMARY KEY,
    contributer  TEXT NOT NULL,
    email        TEXT NOT NULL,
    url          TEXT NOT NULL,
    title        TEXT NOT NULL,
    description  TEXT NOT NULL,
    filename     TEXT UNIQUE NOT NULL,
    mimetype     TEXT NOT NULL,
    path         TEXT UNIQUE NOT NULL,
    originalname TEXT NOT NULL,
    FOREIGN Key (contributer) REFERENCES Users(username)
);

CREATE TABLE IF NOT EXISTS Review(
    reviewer TEXT NOT NULL,
    postid   TEXT NOT NULL,
    rate     INTEGER NOT NULL,
    reason   TEXT,
    FOREIGN Key (reviewer) REFERENCES Users(username)
);

CREATE TABLE IF NOT EXISTS Chat(
    postid TEXT NOT NULL,
    speaker TEXT NOT NULL,
    message TEXT NOT NULL,
    FOREIGN KEY(speaker) REFERENCES Users(username)
);

-- CREATE TABLE IF NOT EXISTS Directmess(
--     chatid INTEGER NOT NULL DEFAULT 0,
--     touser TEXT NOT NULL,
--     fromuser TEXT NOT NULL,
--     message TEXT NOT NULL,
--     FOREIGN KEY(chatid) REFERENCES Chat(id),
--     FOREIGN KEY(touser) REFERENCES Users(userid),
--     FOREIGN KEY(fromuser) REFERENCES Users(userid)
-- );

