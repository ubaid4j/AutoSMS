"use strict";
exports.__esModule = true;
var express = require("express");
var passport = require("passport");
var MessageRoute = /** @class */ (function () {
    function MessageRoute(user) {
        this.router = express.Router();
        this.router.post("/", passport.authenticate('local', { failureRedirect: "/fail" }), function (req, res) {
            res.render("msg/msg");
        });
        this.router.get("/", function (req, res) {
            res.render("msg/msg");
        });
        // this.router.post('/', passport.authenticate('local', { successRedirect: '/',
        //                                             failureRedirect: '/fail' }));
    }
    MessageRoute.prototype.getRouter = function () {
        return this.router;
    };
    return MessageRoute;
}());
exports.MessageRoute = MessageRoute;
