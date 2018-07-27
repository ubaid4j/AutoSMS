"use strict";
exports.__esModule = true;
var express = require("express");
var index_1 = require("./routers/index");
var bodyParser = require("body-parser");
var msgs_1 = require("./routers/msgs");
var passport = require("passport");
var mongoose = require("mongoose");
var user_1 = require("./model/user");
var sendMessage_1 = require("./routers/sendMessageRoute/sendMessage");
var App = /** @class */ (function () {
    function App() {
        var app = express();
        //setting
        app.set("view engine", "ejs");
        mongoose.connect("mongodb://localhost:27017/autoSMS_121", { useNewUrlParser: true });
        //use
        app.use(express.static("public"));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
        app.use(passport.initialize());
        app.use(passport.session());
        var userModel = new user_1.UserModel();
        var User = userModel.getCollection();
        //casting collection to PassportLocalModel<Docuemnt>
        passport.use(User.createStrategy());
        passport.serializeUser(User.serializeUser());
        passport.deserializeUser(User.deserializeUser());
        //this method will create an accout
        userModel.checkUser();
        //instantiate the class of UserCollection   
        this.handleRouter(app, userModel.getCollection());
        this.listen(app);
    }
    App.prototype.handleRouter = function (app, user) {
        var indexRouter = new index_1.IndexRouter();
        var messageRouter = new msgs_1.MessageRoute(user);
        var sender = new sendMessage_1.SendMessage(app);
        app.use("/", indexRouter.getRouter());
        app.use("/msgs", messageRouter.getRouter());
        app.use("/sendMessage", sender.getRouter());
    };
    App.prototype.listen = function (app) {
        app.listen(3000, function () {
            console.log("Server started");
        });
    };
    return App;
}());
//starting app
new App();
