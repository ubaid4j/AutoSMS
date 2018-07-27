"use strict";
exports.__esModule = true;
var express = require("express");
var Nexmo = require("nexmo");
var SendMessage = /** @class */ (function () {
    function SendMessage(application) {
        var _this = this;
        this.router = express.Router();
        this.router.post("/", function (req, res) {
            var number = req.body.number;
            var message = req.body.message;
            console.log(number);
            console.log(message);
            _this.sendSMS(number, message);
            res.redirect("/msgs");
        });
    }
    SendMessage.prototype.sendSMS = function (number, message) {
        var nexmo = new Nexmo({
            apiKey: '00d259ef',
            apiSecret: 'dI2dPWh0552KZJxd'
        });
        var from = 'Nexmo';
        var to = number;
        var text = message;
        nexmo.message.sendSms(from, to, text, function (error, response) {
            if (error) {
                throw error;
            }
            else if (response.messages[0].status != '0') {
                console.error(response);
                throw 'Nexmo returned back a non-zero status';
            }
            else {
                console.log(response);
            }
        });
    };
    SendMessage.prototype.getRouter = function () {
        return this.router;
    };
    return SendMessage;
}());
exports.SendMessage = SendMessage;
