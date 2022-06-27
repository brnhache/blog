const { Client } = require('pg');

const db = new Client({
    user: "postgres",
    password: "thisisapassword",
    database: "blog_database",
    host: "localhost",
    port: 5432
});

db.connect();

module.exports = db;