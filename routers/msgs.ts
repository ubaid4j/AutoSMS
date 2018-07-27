import * as express from "express"
import * as bodyparser from "body-parser";
import * as mongoose from "mongoose";
import * as passport from "passport"

export class MessageRoute
{

    private router : express.Router = express.Router();

    public constructor(user: mongoose.Model<mongoose.Document>)
    {
        this.router.post("/", passport.authenticate('local', {failureRedirect: "/fail"}), (req:express.Request, res:express.Response) =>
        {

            res.render("msg/msg");
    
        });

        
        this.router.get("/", (req:express.Request, res:express.Response) =>
        {
            res.render("msg/msg");
        });


        // this.router.post('/', passport.authenticate('local', { successRedirect: '/',
        //                                             failureRedirect: '/fail' }));

    }

    public getRouter() : express.Router
    {
        return this.router;
    }
}