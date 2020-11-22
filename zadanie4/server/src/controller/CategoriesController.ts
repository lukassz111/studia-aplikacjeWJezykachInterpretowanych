import { Request, Response } from "express"
import { Category } from "../entity/Category";
import DatabaseService from "../service/DatabaseService";
import Controller from "./Controller";

class CategoriesController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.getList(res)
        })
    }
    
    private getList(res: Response) {
        DatabaseService.Connection.getRepository(Category).createQueryBuilder().getMany().then((categories) => {
            res.json(categories)
        })
    }
}

export default CategoriesController