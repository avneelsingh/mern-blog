const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const { MongoClient } = require("mongodb");

// const articlesInfo = {
//     "learn-react": {comments: [],},
//     "learn-node": {comments: [],},
//     "my-thoughts-on-learning-react": {comments: [],},
// }

// Initialize middleware
app.use(express.json({ extended: false }));

//----------------------------------------------------
// After steps 9 to 13:

// app.get("/", (req, res) => res.send("Hello World!"));
// app.post("/", (req, res) => res.send(`Hello ${req.body.name}`));

//----------------------------------------------------

// app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`));
// // http://localhost:8000/hello/Avneel

//----------------------------------------------------
//----------------------------------------------------
// Install MongoDB and complete upto step 29

// app.get("/api/articles/:name/", async (req, res) => {
//     try{
//         const client = await MongoClient.connect("mongodb://localhost:27017");
//         const db = client.db("mern-blog");
//         // const {userName,text} = req.body;
//         const articleName = req.params.name;
//         const articleInfo = await db.collection("articles").findOne({ name: articleName });
//         res.status(200).send(articleInfo);
//         client.close();
//     }
//     catch(error){
//         res.status(500).send({message: "Error connecting to database", error});
//     }
// });
// // http://localhost:8000/api/articles/learn-node in PostMan & Browser

//----------------------------------------------------
//----------------------------------------------------

const withDB = async (operations, res) => {
  try {
    const client = await MongoClient.connect("mongodb://localhost:27017");
    const db = client.db("mern-blog");
    await operations(db);
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Error connecting to database", error });
  }
};


app.get("/api/articles/:name", async (req, res) => {
  withDB(async (db) => {
    const articleName = req.params.name;
    const articleInfo = await db.collection("articles").findOne({ name: articleName });
    res.status(200).json(articleInfo);
  }, res);
});

app.post("/api/articles/:name/add-comments", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;

  console.log("Request body:", req.body);
  console.log("Article name:", articleName);

  withDB(async (db) => {
    const result = await db.collection("articles").updateOne( { name: articleName }, { $push: { comments: { username, text }, }, });

    if (result.matchedCount === 0) {
        return res.status(404).json({
            message: "Article not found"
        });
    }

    const updatedAricleInfo = await db.collection("articles").findOne({ name: articleName });
    res.status(200).json(updatedAricleInfo);
  }, res);
});
// http://localhost:8000/api/articles/learn-node/add-comments in PostMan

//----------------------------------------------------

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));