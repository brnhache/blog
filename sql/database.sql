CREATE DATABASE blog_database;

-- \c blog_database

CREATE TABLE posts(
    id PRIMARY KEY,
    title TEXT NOT NULL, 
    body TEXT NOT NULL, 
    image TEXT NOT NULL
);