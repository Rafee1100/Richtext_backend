const express = require('express')
const cors = require('cors')
const ObjectID = require('mongodb').ObjectID
require('dotenv').config()
const app = express()

// console.log(process.env.DB_USER, process.env.DB_PASS, process.env.DB_NAME)

const MongoClient = require('mongodb').MongoClient;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.buztu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
app.use(express.json())
app.use(cors())

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log(err)
    const blogCollections = client.db("RichText").collection("blogs");

    app.get('/', (req, res)=>{
        res.send("Hero")
    })
    app.get('/blogs', (req, res) => {
        blogCollections.find()
            .toArray((err, items) => {
                res.json(items)
            })
    })
    app.post('/addBlogs', (req, res) => {
        const newBlog = req.body;
        blogCollections.insertOne(newBlog)
            .then(result => {
                res.json(result.insertedCount > 0)
            })
    })


});

app.listen(process.env.PORT || 8080)