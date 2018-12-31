require("dotenv").config();
const express = require("express");
const connectMongo = require("connect-mongo");
const expressSession = require("express-session");
const fileUpload = require("express-fileupload");
const bodyParser = require('body-parser');
const expressEdge = require('express-edge');
const edge = require("edge.js");
const mongoose = require("mongoose");
const connectFlash = require("connect-flash");

const app = new express();
mongoose.connect(process.env.DB_URI);
const mongoStore = connectMongo(expressSession);

app.use(expressSession({
    secret: process.env.EXPRESS_SESSION_KEY,
    store: new mongoStore({ mongooseConnection: mongoose.connection })
}))

app.use(fileUpload());
app.use(express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(connectFlash());
app.use("*", (req,res,next)=>{
    edge.global('auth', req.session.userId);
    next();
})

const storePostMiddleware = require("./middleware/storePost");
const authMiddleware = require("./middleware/auth");
const redirectIfAuthenticatedMiddleware = require("./middleware/redirectIfAuthenticated");

const createPostController = require("./controllers/createPost");
const homePageController = require("./controllers/homePage");
const storePostController = require("./controllers/storePost");
const getPostController = require("./controllers/getPost");
const createUserContoller = require("./controllers/createUser");
const storeUserContorller = require("./controllers/storeUser");
const loginController = require("./controllers/login");
const loginUserController = require("./controllers/loginUser");
const logoutController = require("./controllers/logout");

app.get("/", homePageController);

app.get("/post/new", authMiddleware, createPostController);
app.post("/post/store", authMiddleware, storePostMiddleware, storePostController);
app.get("/post/:id", getPostController);

app.get("/auth/register", redirectIfAuthenticatedMiddleware, createUserContoller);
app.post("/user/register", redirectIfAuthenticatedMiddleware, storeUserContorller);

app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.post("/user/login", redirectIfAuthenticatedMiddleware, loginUserController);
app.get("/auth/logout", authMiddleware, logoutController);

app.use((req,res) => res.render('not-found'));

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}.`)
});
