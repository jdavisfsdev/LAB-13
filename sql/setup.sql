DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS comments;
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL,
    password_hash TEXT NOT NULL,
    profile_photo_url TEXT NOT NULL
);
CREATE TABLE posts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id BIGINT NOT NULL,
    photo_url TEXT NOT NULL,
    caption TEXT NOT NULL,
    tags TEXT [] NOT NULL
);
CREATE TABLE comments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    comment_by BIGINT NOT NULL,
    post BIGINT NOT NULL,
    comment TEXT NOT NULL
);