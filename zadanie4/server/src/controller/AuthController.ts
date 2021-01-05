import { Request, Response } from "express"
import { Util, UtilReq } from "../Util";
import Controller from "./Controller"



export enum UserType {
    Admin = "admin",
    User = "user"
}
export interface User {
    userType: UserType
}
class AuthController extends Controller {
    protected initialize() {
        this.App.post(this.PathPrefix,(req,res) => {
            this.post(req,res)
        })
    }
    private post(req:Request, res:Response) {
        let userType: UserType = req.body.userType
        if(userType == undefined || userType == null) {
            userType = UserType.User
        }
        console.log(req.body)
        let user: User = {
            "userType": userType
        };
        res.jwt({"user":user})
        res.json(UtilReq.createResponse({},user))
    }
}

export default AuthController