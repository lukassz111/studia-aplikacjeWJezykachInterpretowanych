import { Request, Response, Application } from "express"
import Controller from "./Controller";

interface IPathInfo {
    path: string|null
    methods: string[]
}

class RootController extends Controller {

    protected initialize() {
        this.App.get(this.PathPrefix,(req,res) => {
            this.get(req,res)
        })
    }
    private get(req: Request, res: Response) {
        let data: IPathInfo[] = []
        let routes: any[] = this.App._router.stack
    
        routes.forEach((route) => {
            let obj: IPathInfo = {
                methods: [],
                path: null,
            }
            if (route.name === "bound dispatch") {
                let path: any = route.route.path
                let methods: any = route.route.methods

                let methodsName: string[] = []
                for (let methodName of Object.keys(methods)) {
                    if (methods[methodName] === true) {
                        methodsName.push(methodName)
                    }
                }
                obj = { ...obj, path, methods: methodsName }
            }
            if (obj.path !== null) {
                data.push(obj)
            }
        })
        if(req.accepts("html")) {
            res.type('html')
            let response = '<html><body><table>'
            for (let index in data) {
                let el = data[index]
                response += '<tr>'
                response += '<td>'+el.methods.join(', ')+'</td>'
                response += '<td>'+el.path+'</td>'
                response += '</tr>'
            }
            response += '</table></body></html>'
            res.send(response)
        } else {
            res.type('json')
            res.json(data)
        }
    }
}

export default RootController