import { Request, Response, Application } from "express"
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { State } from "../entity/State";
import { ConfigService } from "../service/ConfigService";
import DatabaseService from "../service/DatabaseService";
import { Util, UtilReq } from "../Util";
import Controller from "./Controller";

class OrdersController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            let page = Util.getUrlParamInt(req,'page',0)
            this.getList(req,res,page)
        })
        this.App.get(this.PathPrefix+'/:id',(req,res) => {
            let id = parseInt(req.params['id'])
            this.getElement(req,res,id)
        })
        this.App.post(this.PathPrefix,(req,res) => {
            this.addOrder(req,res)
        })
        this.App.put(this.PathPrefix+'/:id/state',(req,res)=> {
            this.updateOrderState(req,res,req.params['id'])
        })
        this.App.get(this.PathPrefix+'/state/:sateId',(req,res)=> {
            let page = Util.getUrlParamInt(req,'page',0)
            let stateId = req.params['sateId']
            this.getListWithState(req,res,page,stateId)
        })
    }
    private getList(req: Request, res: Response,page:number) {
        let perPage: number = ConfigService.Config['perPage']
        let startIndex = page*perPage
        let x = async () => {
            let count = await DatabaseService.Connection.getRepository(Order).createQueryBuilder().getCount()
            let orders = await DatabaseService.Connection.getRepository(Order).createQueryBuilder().offset(startIndex).limit(perPage).getMany()
            let json_orders = orders.map<any>((p)=>{
                return p
            })
            res.json(UtilReq.createResponseList(count,perPage,json_orders))
        }
        x()
    }
    private getElement(req: Request, res: Response,id:number) {
        let x = async () => {
            
            let count = await DatabaseService.Connection.getRepository(Order).createQueryBuilder().getCount()
            let orderRepository = DatabaseService.Connection.getRepository(Order)
            let orders = await orderRepository.find({
                where: '"order"."id" = '+id,
                relations: ['products']
            })
            //let orders = orderRepository.//.where('id = '+id).getMany()
            if(orders.length <= 0) {
                res.json(UtilReq.createResponseList(count,1,[]))
                return
            }
            let order = orders[0]
            let productsIds: Array<number> = []
            order.products.forEach((x)=> {
                productsIds.push(x.id)
            })
            let json_order = {
                "approveDate":order.approveDate,
                "phone_number":order.phone_number,
                "id":order.id,
                "state":order.state,
                "products": productsIds
            }
            res.json(UtilReq.createResponseList(count,1,[json_order]))
        }
        x()
    }
    private addOrder(req: Request, res: Response) {
        let x = async () => {
            if(!Object.prototype.hasOwnProperty.call(req.body,'ids')){
                UtilReq.responseAddOrUpdateFailureClient(res)
                return
            }
            if(!Object.prototype.hasOwnProperty.call(req.body,'phoneNumber')){
                UtilReq.responseAddOrUpdateFailureClient(res)
                return
            }
            let ids = req.body['ids'] as Array<number>
            let phoneNumber = req.body['phoneNumber'] as string
            let productsAwait: Array<Promise<Array<Product>>> = []
            for(var i = 0; i < ids.length; i++) {
                let id = ids[i]
                let productAwait = DatabaseService.Connection.getRepository(Product).createQueryBuilder().select().where('id = '+id).getMany()
                productsAwait.push(productAwait)
            }
            let products: Array<Product> = []
            let notExistingProductsIds: Array<number> = []
            for (let i = 0; i < productsAwait.length; i++) {
                let productAwait = productsAwait[i];
                let product = await productAwait;
                if(product.length > 0) {
                    products.push(product[0])
                } else {
                    notExistingProductsIds.push(ids[i])
                }
            }
            if(notExistingProductsIds.length > 0) {
                UtilReq.responseAddOrUpdateFailureClient(res)
                return
            }
            let newOrder = new Order()
            newOrder.approveDate = null
            newOrder.phone_number = phoneNumber
            newOrder.state = 'NOT_APPROVED'
            newOrder.products = products
            let order = await DatabaseService.Connection.getRepository(Order).save(newOrder)
            UtilReq.responseAddOrUpdateSuccess(res,{order: order})
        }
        x()
    }
    private updateOrderState(req: Request, res: Response, id: string) {
        //TODO implement

    }
    private getListWithState(req: Request, res: Response,page:number, stateId: string) {
        let perPage: number = ConfigService.Config['perPage']
        let startIndex = page*perPage
        let x = async () => {
            let count = await DatabaseService.Connection.getRepository(Order).createQueryBuilder().where('"Order"."state" = "'+stateId+'"').getCount()
            let orders = await DatabaseService.Connection.getRepository(Order).createQueryBuilder().where('"Order"."state" = "'+stateId+'"').offset(startIndex).limit(perPage).getMany()
            let json_orders = orders.map<any>((p)=>{
                return p
            })
            res.json(UtilReq.createResponseList(count,perPage,json_orders))
        }
        x()
    }
}

export default OrdersController