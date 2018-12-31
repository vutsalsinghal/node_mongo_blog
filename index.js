const express = require("express");
const connectMongo = require("connect-mongo");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const expressEdge = require('express-edge');
const mongoose = require("mongoose");

const app = new express();
mongoose.connect("mongodb://localhost/node_blog_connection");
const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}))

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const storePostMiddleware = require("./middleware/storePost");
const authMiddleware = require("./middleware/auth");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserContoller = require("./controllers/createUser");
const storeUserContorller = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");

app.get("/", homePageController);

app.get("/post/new", authMiddleware, createPostController);
app.post("/post/store", authMiddleware, storePostMiddleware, storePostController);
app.get("/post/:id", getPostController);

app.get("/auth/register", createUserContoller);
app.post("/user/register", storeUserContorller);

app.get("/auth/login", loginController);
app.post("/user/login", loginUserController);

app.listen(4000, () => {
    console.log('App listening on port 4000.')
});
