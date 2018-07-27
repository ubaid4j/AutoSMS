import * as mongoose from "mongoose"
import * as passportLocalMongoose from "passport-local-mongoose"
import * as passport from "passport"
import { MongoError } from "../node_modules/@types/mongodb";

export class UserModel
{
    private user:mongoose.Model<mongoose.Document> = null;

    public constructor()
    {
        // //connection
        // mongoose.connect("mongodb://ubaid:kaylin13@ds257241.mlab.com:57241/auto_sms", {useNewUrlParser: true}, (err: MongoError) =>
        // {
        //     console.log(err);
        // });
        
        
        //creating a schema
        let user: mongoose.Schema = new mongoose.Schema(
            {
                username: String,
                password: String
            }
        );

        user.plugin(passportLocalMongoose);

        let User:mongoose.Model<mongoose.Document> = mongoose.model("user", user);

        this.setCollection(User);


        //this function checks if the user is in the database or not
        //if there is no user then it add the user
        //if there is user present in database, 
        //then it do nothing
    }



    public checkUser() : void
    {
        //my wish is first find the data 
        //if data is present then do nothing
        //if data is not present ceate a document

        //but as, this is not a main focus, so we will do something like follow
        //1. first delete all data in the collection (which is User)
        //2. then manully add the data

        
        let User:mongoose.Model<mongoose.Document> = this.getCollection();


        let Username : mongoose.Document = new User(
            {
                username: "grandeur.exchange"
            }
        );


        User.findOne({"username" : "grandeur.exchange"}, (err: any, doc: mongoose.Document) => 
        {
            if(err)
            {
                console.log(err);
            }
            else
            {
                if(doc == null)
                {
                    let password : string = "kaylin13";

                    (this.getCollection() as mongoose.PassportLocalModel<mongoose.Document>).register(Username, password, (err:any, account:any) => 
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            (User as mongoose.PassportLocalModel<mongoose.Document>).authenticate()("grandeur.exchange", "kaylin13", (err:any, doc: mongoose.Document) =>
                            {
                                if(err)
                                {
                                    console.log(err);
                                }
                                else
                                {
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


    }

    public setCollection(user:mongoose.Model<mongoose.Document>):void
    {
        this.user = user;
    }

    public getCollection():mongoose.Model<mongoose.Document>
    {
        return this.user;
    }
}