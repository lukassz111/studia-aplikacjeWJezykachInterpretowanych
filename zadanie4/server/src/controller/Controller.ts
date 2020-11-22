import { RequestHandler, Request, Response, Application } from "express"
class Controller {
    private _app: Application;
    get App(): Application {
        return this._app
    }
    private _pathPrefix: string;
    get PathPrefix(): string {
        return this._pathPrefix
    }
    constructor(_app: Application,private pathPrefix: string) {
        this._app = _app
        this._pathPrefix = pathPrefix
        this.initialize()
    }
    protected initialize() {}
}
export default Controller;