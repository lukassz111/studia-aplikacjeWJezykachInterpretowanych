import { Request, Response } from "express"
import { Product } from "../entity/Product";
import { ConfigService } from "../service/ConfigService";
import DatabaseService from "../service/DatabaseService";
import { Util } from "../Util";
import Controller from "./Controller";

class ProductsController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            let page = Util.getUrlParamInt(req,'page',0)
            this.getList(req,res,page)
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

    private getList(req: Request, res: Response,page: number) {
        let perPage: number = ConfigService.Config['perPage']
        let startIndex = page*perPage
        let x = async () => {
            let products = await DatabaseService.Connection.getRepository(Product).createQueryBuilder().offset(startIndex).limit(perPage).getMany()
            let count = await DatabaseService.Connection.getRepository(Product).createQueryBuilder().getCount()
            let json_products = products.map<any>((p)=>{
                return p.toJson()
            })
            res.json({
                metadata: {
                    count_all: count,
                    per_page: perPage
                },
                data: json_products
            })
        }
        x()
    }
    
    private getElement(req: Request, res: Response, id: string) {

    }

    private addElement(req: Request, res: Response) {

    }

    private updateElement(req: Request, res: Response, id: string) {

    }
}

export default ProductsController