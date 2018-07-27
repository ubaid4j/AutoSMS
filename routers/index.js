"use strict";
exports.__esModule = true;
var express = require("express");
var IndexRouter = /** @class */ (function () {
    function IndexRouter() {
        this.router = express.Router({ mergeParams: true });
        this.enroute(this.getRouter());
    }
    IndexRouter.prototype.enroute = function (router) {
        router.get("/", function (req, res) {
            res.render("index/landingPage");
        });
    };
    IndexRouter.prototype.setRouter = function (router) {
        this.router = router;
    };
    IndexRouter.prototype.getRouter = function () {
        return this.router;
    };
    return IndexRouter;
}());
exports.IndexRouter = IndexRouter;
