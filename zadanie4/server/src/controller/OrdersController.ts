import { Request, Response, Application } from "express"
import { Order } from "../entity/Order";
import { Product } from "../entity/Product";
import { State } from "../entity/State";
import DatabaseService from "../service/DatabaseService";
import { UtilReq } from "../Util";
import Controller from "./Controller";

class OrdersController extends Controller {
    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.getListOrders(req,res)
        })
        this.App.post(this.PathPrefix,(req,res) => {
            this.addOrder(req,res)
        })
        this.App.put(this.PathPrefix+'/:id/state',(req,res)=> {
            this.updateOrderState(req,res,req.params['id'])
        })
        this.App.get(this.PathPrefix+'/state/:sateId',(req,res)=> {
            this.getListOrdersWithState(req,res,req.params['sateId'])
        })
    }
    private getListOrders(req: Request, res: Response) {
        //TODO implement
        DatabaseService.Connection.getRepository(Order).createQueryBuilder().getMany().then((orders) => {
            res.json(orders)
        })
    }
    private addOrder(req: Request, res: Response) {
        let x = async () => {
            if(!Object.prototype.hasOwnProperty.call(req.body,'ids')){
                UtilReq.responseAddOrUpdateFailureClient(res)
                return
            }
            let ids = req.body['ids'] as Array<number>
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
            let notApprovedState = await DatabaseService.Connection.getRepository(State).createQueryBuilder().select().where('id = "NOT_APPROVED"').getMany()[0]
            let newOrder = new Order()
            newOrder.approveDate = null
            newOrder.phone_number = '797566668'
            newOrder.state = notApprovedState
            newOrder.products = products
            let order = await DatabaseService.Connection.getRepository(Order).save(newOrder)
            UtilReq.responseAddOrUpdateSuccess(res,{order: order})
        }
        x()
    }
    private updateOrderState(req: Request, res: Response, id: string) {
        //TODO implement

    }
    private getListOrdersWithState(req: Request, res: Response, stateId: string) {
        //TODO implement
    }
}

export default OrdersController