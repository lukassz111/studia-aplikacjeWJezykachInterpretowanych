import { Request, Response, Application } from "express"
import { State } from "../entity/State";
import DatabaseService from "../service/DatabaseService";
import Controller from "./Controller";

class StatesController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.getList(req,res)
        })
    }
    
    private getList(req: Request, res: Response) {
        DatabaseService.Connection.getRepository(State).createQueryBuilder().getMany().then((states) => {
            res.json(states)
        })
    }
}

export default StatesController