# MERN Blog

A full-stack blog application built using the **MERN stack**:

-   **MongoDB** -- Database
-   **Express.js** -- Backend API
-   **React.js** -- Frontend
-   **Node.js** -- Runtime
-   **Tailwind CSS** -- UI styling
-   **React Router** -- Client-side routing
-   **Postman** -- API testing
-   **MongoDB Compass** -- Database management

------------------------------------------------------------------------

## Project Structure

``` text
mern-blog/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server.js               # Express backend
├── package.json             # Backend/root configuration
└── README.md
```

------------------------------------------------------------------------

# 1. Create the React Application

Create the project directory:

``` bash
mkdir mern-blog
cd mern-blog
```

Create the React application:

``` bash
npx create-react-app client
```

Move into the client directory:

``` bash
cd client
```

------------------------------------------------------------------------

# 2. Install and Configure Tailwind CSS

Install Tailwind CSS and its dependencies:

``` bash
npm install -D tailwindcss@3.4.19 postcss autoprefixer
```

Initialize Tailwind:

``` bash
npx tailwindcss init
```

## `tailwind.config.js`

``` js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

## `postcss.config.js`

Create `postcss.config.js` in the `client` folder:

``` js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## `src/index.css`

Replace the contents of `src/index.css` with:

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Test Tailwind

Temporarily use the following in `src/App.js`:

``` jsx
function App() {
  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-white">
        Tailwind is working!
      </h1>
    </div>
  );
}

export default App;
```

Start the React application:

``` bash
npm start
```

The application should open at:

``` text
http://localhost:3000/
```

------------------------------------------------------------------------

# 3. Install React Router

From the `client` directory:

``` bash
npm install react-router-dom
```

React Router is used for navigation between pages such as:

``` text
/
 /about
 /article/:name
```

------------------------------------------------------------------------

# 4. Set Up the Express Backend

Go back to the project root:

``` bash
cd ..
```

Install Express:

``` bash
npm install express
```

Install development tools:

``` bash
npm install -D concurrently nodemon
```

------------------------------------------------------------------------

# 5. Root `package.json`

Configure the root `package.json` as follows:

``` json
{
  "name": "mern-blog",
  "version": "1.0.0",
  "description": "MERN Blog",
  "main": "server.js",
  "scripts": {
    "server": "nodemon server",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\""
  },
  "keywords": [],
  "author": "Avneel Singh",
  "license": "ISC",
  "dependencies": {
    "express": "^5.2.1"
  },
  "devDependencies": {
    "concurrently": "^10.0.5",
    "nodemon": "^3.1.14"
  }
}
```

------------------------------------------------------------------------

# 6. Configure the React Proxy

Open:

``` text
client/package.json
```

Add the following property:

``` json
"proxy": "http://localhost:8000"
```

For example:

``` json
{
  "name": "client",
  "version": "0.1.0",
  "proxy": "http://localhost:8000"
}
```

This allows the React frontend to make API requests to the Express
backend without writing `http://localhost:8000` in every request.

------------------------------------------------------------------------

# 7. Run the Express Server

From the project root:

``` bash
npm run server
```

The backend runs on:

``` text
http://localhost:8000/
```

------------------------------------------------------------------------

# 8. Test APIs with Postman

Install and open Postman.

For a POST request, select:

``` text
Body → raw → JSON
```

Example request body:

``` json
{
  "username": "Aman",
  "text": "I like this post"
}
```

------------------------------------------------------------------------

# 9. Install MongoDB

Install MongoDB Server.

The default installation location used in this project is:

``` text
C:\Program Files\MongoDB\Server\9.0\bin
```

Open **Terminal 1**:

``` powershell
cd "C:\Program Files\MongoDB\Server\9.0\bin"
```

Create the MongoDB data directory:

``` powershell
mkdir C:\data\db
```

Start MongoDB:

``` powershell
.\mongod.exe --dbpath "C:\data\db"
```

Keep this terminal running.

MongoDB will listen on:

``` text
mongodb://127.0.0.1:27017
```

------------------------------------------------------------------------

# 10. Install MongoDB Shell (`mongosh`)

Download MongoDB Shell from:

https://www.mongodb.com/try/download/shell

Create a directory:

``` powershell
mkdir C:\mongosh
```

Extract the downloaded ZIP file.

Example:

``` text
C:\mongosh\mongosh-2.12.0-win32-x64\bin
```

Add the `bin` directory to the Windows PATH:

``` text
Environment Variables
    → Path
    → Edit
    → New
    → C:\mongosh\mongosh-2.12.0-win32-x64\bin
```

Open a **new terminal** and run:

``` powershell
mongosh
```

------------------------------------------------------------------------

# 11. Test MongoDB Connection

Inside `mongosh`:

``` js
show dbs
```

Select the project database:

``` js
use mern-blog
```

Test the connection:

``` js
db.test.insertOne({
  message: "MongoDB connected successfully"
})
```

Expected result:

``` text
acknowledged: true
```

------------------------------------------------------------------------

# 12. Install MongoDB Compass

Download MongoDB Compass from:

https://www.mongodb.com/try/download/compass

Connect to:

``` text
mongodb://127.0.0.1:27017
```

Open:

``` text
mern-blog
    └── articles
```

Compass can be used to view and edit the stored articles and comments.

------------------------------------------------------------------------

# 13. Create the Articles Collection

In `mongosh`:

``` js
use mern-blog
```

To remove all existing documents from the `articles` collection:

``` js
db.articles.deleteMany({})
```

Insert the initial articles:

``` js
db.articles.insertMany([
  {
    name: "learn-react",
    comments: []
  },
  {
    name: "learn-node",
    comments: []
  },
  {
    name: "my-thoughts-on-learning-react",
    comments: []
  }
])
```

View the documents:

``` js
db.articles.find()
```

Pretty-print the documents:

``` js
db.articles.find().pretty()
```

------------------------------------------------------------------------

# 14. Update a Comment Username

If a comment exists and you want to update the username of the first
matching comment:

``` js
db.articles.updateOne(
  {
    name: "learn-node",
    "comments.username": null
  },
  {
    $set: {
      "comments.$.username": "Avneel"
    }
  }
)
```

For a real application, using a unique comment ID is recommended when
editing or deleting individual comments.

------------------------------------------------------------------------

# 15. Install the MongoDB Node.js Driver

From the project root:

``` bash
npm install mongodb
```

The MongoDB driver allows the Express server to communicate with
MongoDB.

------------------------------------------------------------------------

# 16. Configure the Express + MongoDB Backend

The backend connects to MongoDB using:

``` js
const { MongoClient } = require("mongodb");

const client = await MongoClient.connect(
  "mongodb://localhost:27017"
);

const db = client.db("mern-blog");
```

The application uses the `articles` collection to store blog articles
and their comments.

------------------------------------------------------------------------

# 17. Example Article API

Get an article:

``` text
GET /api/articles/:name
```

Example:

``` text
http://localhost:8000/api/articles/learn-node
```

------------------------------------------------------------------------

# 18. Add a Comment API

The application provides the following endpoint:

``` text
POST /api/articles/:name/add-comments
```

Example:

``` text
POST http://localhost:8000/api/articles/learn-node/add-comments
```

Request body:

``` json
{
  "username": "Avneel",
  "text": "Great article!"
}
```

A comment is stored inside the article's `comments` array:

``` json
{
  "name": "learn-node",
  "comments": [
    {
      "username": "Avneel",
      "text": "Great article!"
    }
  ]
}
```

A MongoDB-native way to add a comment is:

``` js
await db.collection("articles").updateOne(
  { name: articleName },
  {
    $push: {
      comments: {
        username,
        text
      }
    }
  }
);
```

------------------------------------------------------------------------

# 19. Install `whatwg-fetch`

Stop the server if it is running.

Move to the client directory:

``` bash
cd client
```

Install:

``` bash
npm install whatwg-fetch
```

Open:

``` text
client/src/index.js
```

Add at the top:

``` js
import "whatwg-fetch";
```

Go back to the project root:

``` bash
cd ..
```

------------------------------------------------------------------------

# 20. Run the Complete MERN Application

### Terminal 1 --- MongoDB

``` powershell
cd "C:\Program Files\MongoDB\Server\9.0\bin"
```

Start MongoDB:

``` powershell
.\mongod.exe --dbpath "C:\data\db"
```

Keep this terminal running.

### Terminal 2 --- MERN application

From the project root:

``` bash
npm run dev
```

This starts both:

-   Express backend → `http://localhost:8000`
-   React frontend → `http://localhost:3000`

Open:

``` text
http://localhost:3000/
```

------------------------------------------------------------------------

# 21. Useful MongoDB Commands

### Show databases

``` js
show dbs
```

### Select database

``` js
use mern-blog
```

### Show collections

``` js
show collections
```

### View all articles

``` js
db.articles.find()
```

### Pretty-print articles

``` js
db.articles.find().pretty()
```

### Find one article

``` js
db.articles.findOne({
  name: "learn-node"
})
```

### Delete all articles

``` js
db.articles.deleteMany({})
```

### Delete the entire collection

``` js
db.articles.drop()
```

### Add a comment directly

``` js
db.articles.updateOne(
  { name: "learn-node" },
  {
    $push: {
      comments: {
        username: "Avneel",
        text: "Test comment"
      }
    }
  }
)
```

------------------------------------------------------------------------

# 22. Application URLs

  --------------------------------------------------------------------------------------------------
  Service                             URL
  ----------------------------------- --------------------------------------------------------------
  React Frontend                      `http://localhost:3000`

  Express Backend                     `http://localhost:8000`

  MongoDB                             `mongodb://127.0.0.1:27017`

  Example Article API                 `http://localhost:8000/api/articles/learn-node`
  
  Add Comment API                     `http://localhost:8000/api/articles/learn-node/add-comments`
  
  --------------------------------------------------------------------------------------------------

------------------------------------------------------------------------

# 23. Author

**Avneel Singh**
