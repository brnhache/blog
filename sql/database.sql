CREATE DATABASE blog_database;

-- \c blog_database
--modifying psql from command line:
--
--$ psql -d blog_database [log in and connect to blog_database]
--$ psql -l [List databases and log out]
--$ \d [List databases once logged in]
--$ \dt [List tables once connected to a database]
--$ \d <table name> [Show columns, etc]

CREATE TABLE posts(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    image TEXT NOT NULL
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    email VARCHAR(254) NOT NULL, -- tools.ietf.org/html/rfc5321#section-4.5.3.1.3 states that the maximum length of a path is 256 characters, and that has to include the surrounding "<" and ">" making the maximum 254.
    password VARCHAR(100) NOT NULL
);