import { Request, Response } from "express"
import { Product } from "../entity/Product";
import DatabaseService from "../service/DatabaseService";
import Controller from "./Controller";

class ProductsController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.getList(req,res)
        })
        this.App.get(this.PathPrefix+'/:id',(req,res)=> {
            this.getElement(req,res,req.params['id'])
        })
        this.App.post(this.PathPrefix,(req,res)=> {
            this.addElement(req,res)
        })
        this.App.put(this.PathPrefix+'/:id',(req,res)=> {
            this.updateElement(req,res,req.params['id'])
        })
    }

    private getList(req: Request, res: Response) {
        DatabaseService.Connection.getRepository(Product).createQueryBuilder().getMany().then((products) => {
            res.json(products)
        })
    }
    
    private getElement(req: Request, res: Response, id: string) {

    }

    private addElement(req: Request, res: Response) {

    }

    private updateElement(req: Request, res: Response, id: string) {

    }
}

export default ProductsController