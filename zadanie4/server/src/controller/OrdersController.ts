import { Request, Response, Application } from "express"
import { Order } from "../entity/Order";
import DatabaseService from "../service/DatabaseService";
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
        //TODO implemnet
        DatabaseService.Connection.getRepository(Order).createQueryBuilder().getMany().then((orders) => {
            res.json(orders)
        })
    }
    private addOrder(req: Request, res: Response) {
        //TODO implemnet
    }
    private updateOrderState(req: Request, res: Response, id: string) {
        //TODO implemnet

    }
    private getListOrdersWithState(req: Request, res: Response, stateId: string) {
        //TODO implemnet
    }
}

export default OrdersController