const express = require('express');
const app = express();
const PORT = 3001;

const db = require("./db");
const path = require('path');
const image_dir = path.join('/home/ubuntu/projects/blog/images', 'public');
app.use(express.static(image_dir));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true, parameterLimit: 50000 }));
app.use(express.json());

//Routes

//get all posts

//get a post

//create a post

//update a post

//delete a post

app.get('/', (req, res) => {
    console.log("Home Page");
    res.send("Home Page");
});

app.get('/post/get', async (req, res) => {
    try {
        console.log("Get Post");
    } catch (err) {
        console.log(err);
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
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
