CREATE DATABASE blog_database;

-- \c blog_database

CREATE TABLE posts(
    id PRIMARY KEY,
    title TEXT, 
    body TEXT, 
    image bytea
);