import { Request, Response } from "express"
import { Category } from "../entity/Category";
import { ConfigService } from "../service/ConfigService";
import DatabaseService from "../service/DatabaseService";
import { Util, UtilReq } from "../Util";
import Controller from "./Controller";

class CategoriesController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            let page = Util.getUrlParamInt(req,'page',0)
            this.getList(req,res,page)
        })
        
        this.App.post(this.PathPrefix,(req,res)=> {
            this.addElement(req,res)
        })
    }

    private getList(req: Request, res: Response,page: number) {
        let perPage: number = ConfigService.Config['perPage']
        let startIndex = page*perPage
        let x = async () => {
            let count = await DatabaseService.Connection.getRepository(Category).createQueryBuilder().getCount()
            let category = await DatabaseService.Connection.getRepository(Category).createQueryBuilder().offset(startIndex).limit(perPage).getMany()
            let json_products = category.map<any>((p)=>{
                return p.toJson()
            })
            res.json(UtilReq.createResponseList(count,perPage,json_products))
        }
        x()
    }
    private addElement(req:Request,res:Response) {
        let hasId = Object.prototype.hasOwnProperty.call(req.body,'id')
        if(!hasId) {UtilReq.responseAddOrUpdateFailureClient(res)
            return
        }
        let category = new Category()
        category.id = req.body.id
        DatabaseService.Connection.getRepository(Category).save(category).catch(()=>{
            UtilReq.responseAddOrUpdateFailureServer(res)
            return
        })
        .then((dbCategory: Category)=>{
            UtilReq.responseAddOrUpdateSuccess(res,dbCategory)
            return
        })
    }
}

export default CategoriesController