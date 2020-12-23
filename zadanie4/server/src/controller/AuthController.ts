import { Request, Response } from "express"
import Controller from "./Controller";

class AuthController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.get(req,res)
        })
    }
    private get(req:Request, res:Response) {
        console.log(req.jwt)
        res.jwt({"payload":"xddd"})
        res.json({"xd":"xd"})
    }
}

export default AuthController