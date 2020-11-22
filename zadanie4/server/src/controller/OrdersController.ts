import express ,{ Request, Response, Application } from "express"
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

    }
    private addOrder(req: Request, res: Response) {

    }
    private updateOrderState(req: Request, res: Response, id: string) {

    }
    private getListOrdersWithState(req: Request, res: Response, stateId: string) {

    }
}

export default OrdersController