import { Request, Response } from "express"
import { Product } from "../entity/Product";
import { jwt_middleware } from "../jwt";
import { ConfigService } from "../service/ConfigService";
import DatabaseService from "../service/DatabaseService";
import { Util, UtilReq } from "../Util";
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
            let count = await DatabaseService.Connection.getRepository(Product).createQueryBuilder().getCount()
            let products = await DatabaseService.Connection.getRepository(Product).createQueryBuilder().offset(startIndex).limit(perPage).loadAllRelationIds().getMany()
            let json_products = products.map<any>((p)=>{
                return p.toJson()
            })
            res.json(UtilReq.createResponseList(count,perPage,json_products))
        }
        x()
    }
    
    private getElement(req: Request, res: Response, id: string) {
        //TODO get element
    }

    private addElement(req: Request, res: Response) {
        let hasCategory = Object.prototype.hasOwnProperty.call(req.body,'category')
        let hasName = Object.prototype.hasOwnProperty.call(req.body,'name')
        let hasDescription = Object.prototype.hasOwnProperty.call(req.body,'description')
        let hasPrice = Object.prototype.hasOwnProperty.call(req.body,'price')
        let hasWeight = Object.prototype.hasOwnProperty.call(req.body,'weight')
        let hasAll = hasCategory && hasName && hasDescription && hasPrice && hasWeight
        if(!hasAll) {
            UtilReq.responseAddOrUpdateFailureClient(res)
            return
        }
        let product = new Product()
        product.category = req.body.category
        product.name = req.body.name
        product.description = req.body.description
        product.price = req.body.price
        product.weight = req.body.weight
        console.log(product)
        DatabaseService.Connection.getRepository(Product).save(product).catch(()=>{
            UtilReq.responseAddOrUpdateFailureServer(res)
            return
        }).then((dbProduct: Product)=>{
            UtilReq.responseAddOrUpdateSuccess(res,dbProduct)
            return
        })
    }

    private updateElement(req: Request, res: Response, id: string) {
        //TODO update element
    }
}

export default ProductsController