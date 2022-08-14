const express = require('express');
const app = express();
const PORT = 3001;

const db = require("./db");

app.use(express.json({ limit: '25mb' }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log("Home Page");
    res.send("Home Page");
});

/*************************************
 * Posts
 *************************************/
app.get('/post/get', async (req, res) => {
    try {
        console.log("Get Post");
    } catch (err) {
        console.error(err);
    }
});

app.delete('/post/delete', async (req, res) => {
    try {
        const success = await db.query(`
        delete from posts where id = ${req.body.post_id}`);
        res.send(success);
    } catch (err) {
        console.error(err);
    }
});

app.get('/post/getAll', async (req, res) => {
    try {
        const posts = await db.query(`
            select * from posts;
        `);
        res.status(200).send(posts.rows);
    } catch (err) {
        console.error(err);
    }
});

app.post('/post/create', async (req, res) => {
    try {
        const data = await req.body;
        const { title, body, image } = data;
        await db.query(`
            insert into posts (title, body, image) values (
                $1,
                $2,
                $3
            );
        `, [title, body, image]);
        res.status(200).send("Post created!");
    } catch (err) {
        res.status(500).send("Something went wrong. Post NOT created.");
        console.error(err);
    }
});

app.put('/post/update', async (req, res) => {
    try {
        const data = await req.body;
        const { title, body, image, id } = data;
        await db.query(`
            update posts
            set title = $1, body = $2, image = $3
            where id = $4
        `, [title, body, image, id]);
        res.status(200).send("Post created!");
    } catch (err) {
        res.status(500).send("Something went wrong. Post NOT created.");
        console.error(err);
    }
});

/*************************************
 * Users
 *************************************/
app.post('/users/create', async (req, res) => {
    try {
        const data = await req.body;
        const { username, email, password } = data;
        await db.query(`insert into users (username, email, password) values($1, $2, crypt($3, gen_salt('bf')))`, [username, email, password]);
        res.status(200).send("User created!");
    } catch (err) {
        res.status(500).send("Something went wrong. User NOT created.");
        console.error(err);
    }
});

/**
 *
 */
app.get('/users/login', async (req, res) => {
    try {
        const data = req.query;
        const { username, password } = data;
        const pwhash_result = await db.query(`select password from users where username = $1`, [username]);
        const pwhash = pwhash_result.rows.length ? pwhash_result.rows[0].password : false;
        if (!pwhash) {
            res.status(401).send("Credentials not correct. User NOT authenticated.");
            return;
        }
        const result = (await db.query(`select ($3 = crypt($2, $3)) as pwmatch from users where username = $1`, [username, password, pwhash]));
        const authenticated = result.rows[0].pwmatch;
        if (authenticated) {
            try {
                res.status(200).send("User authenticated!");
            } catch (err) {
                console.log(err);
            }
        } else {
            res.status(401).send("Credentials not correct. User NOT authenticated.");
        }
    } catch (err) {
        res.status(500).send("Something went wrong. User NOT authenticated.");
        console.error(err);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
