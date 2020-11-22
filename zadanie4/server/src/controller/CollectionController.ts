import express, { RequestHandler, Request, Response } from "express"
class CollectionController {
    private __app: express.Application;
    get app(): express.Application {
        return this.__app
    }
    constructor(_app: express.Application,private controllerName: string,
        getListEnabled: boolean = true, getElementEnabled: boolean = true,
        addElementEnabled: boolean = true, updateElementEnabled: boolean = true) {
        this.__app = _app
        if(getListEnabled) {
            this.app.get('/'+controllerName,(req,res) => {
                this.getList(req,res)
            })
        }
        if(getElementEnabled) {
            this.app.get('/'+controllerName+'/:'+controllerName+'_id',(req,res) => {
                this.getElement(req,res)
            })
        }
        if(addElementEnabled) {
            this.app.post('/'+controllerName,(req,res)=>{
                this.addElement(req,res)
            })
        }
        if(updateElementEnabled) {
            this.app.put('/'+controllerName+'/:'+controllerName+'_id',(req,res)=> {
                this.updateElement(req,res)
            })
        }
    }

    
    //get list
    public getList(req: Request, res: Response) {
        res.sendStatus(404)
    }
    //get/:id get el
    public getElement(req: Request, res: Response) {
        res.sendStatus(404)
    }
    //post add el
    public addElement(req: Request, res: Response) {
        res.sendStatus(404)
    }
    //put/:id update el
    public updateElement(req: Request, res: Response) {
        res.sendStatus(404)
    }
}
export default CollectionController;