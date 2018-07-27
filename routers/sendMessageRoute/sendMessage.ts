import * as express from "express";
import * as Client from "hangupsjs";
import * as Nexmo from "nexmo";

export class SendMessage
{

    private router:express.Router = express.Router();

    constructor(application:express.Application)
    {
        this.router.post("/", (req:express.Request, res:express.Response) =>
        {

            let number:string = req.body.number;
            let message:string = req.body.message;

            console.log(number);
            console.log(message);

            this.sendSMS(number, message);

            res.redirect("/msgs");

        });
    }


    private sendSMS(number:string, message:string): void
    {
        const nexmo = new Nexmo(
        {
            apiKey: '00d259ef',
            apiSecret: 'dI2dPWh0552KZJxd'
        });
          
        const from = 'Nexmo';
        const to = number;
        const text = message;
          
        nexmo.message.sendSms(from, to, text, (error, response) =>
        {
            if(error)
            {
              throw error;
            }
            else if(response.messages[0].status != '0')
            {
              console.error(response);
              throw 'Nexmo returned back a non-zero status';
            }
            else
            {
              console.log(response);
            }
        });
    }


    public getRouter():express.Router
    {
        return this.router;
    }
}