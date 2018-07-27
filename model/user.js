"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var UserModel = /** @class */ (function () {
    function UserModel() {
        // //connection
        // mongoose.connect("mongodb://ubaid:kaylin13@ds257241.mlab.com:57241/auto_sms", {useNewUrlParser: true}, (err: MongoError) =>
        // {
        //     console.log(err);
        // });
        this.user = null;
        //creating a schema
        var user = new mongoose.Schema({
            username: String,
            password: String
        });
        user.plugin(passportLocalMongoose);
        var User = mongoose.model("user", user);
        this.setCollection(User);
        //this function checks if the user is in the database or not
        //if there is no user then it add the user
        //if there is user present in database, 
        //then it do nothing
    }
    UserModel.prototype.checkUser = function () {
        //my wish is first find the data 
        //if data is present then do nothing
        //if data is not present ceate a document
        var _this = this;
        //but as, this is not a main focus, so we will do something like follow
        //1. first delete all data in the collection (which is User)
        //2. then manully add the data
        var User = this.getCollection();
        var Username = new User({
            username: "grandeur.exchange"
        });
        User.findOne({ "username": "grandeur.exchange" }, function (err, doc) {
            if (err) {
                console.log(err);
            }
            else {
                if (doc == null) {
                    var password = "kaylin13";
                    _this.getCollection().register(Username, password, function (err, account) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            User.authenticate()("grandeur.exchange", "kaylin13", function (err, doc) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log("Authenticated");
                                    console.log(doc);
                                }
                            });
                            console.log("Account Created");
                        }
                    });
                }
            }
        });
    };
    UserModel.prototype.setCollection = function (user) {
        this.user = user;
    };
    UserModel.prototype.getCollection = function () {
        return this.user;
    };
    return UserModel;
}());
exports.UserModel = UserModel;
