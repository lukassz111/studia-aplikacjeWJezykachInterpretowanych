import { Request, Response, Application } from "express"
import Controller from "./Controller";

class CategoriesController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.getList(req,res)
        })
    }
    
    private getList(req: Request, res: Response) {
        
    }
}

export default CategoriesController