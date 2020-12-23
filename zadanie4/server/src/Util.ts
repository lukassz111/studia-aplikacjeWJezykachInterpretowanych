import { Request, Response } from "express"

class _Util {
    public getUrlParam(req: Request, paramName: string, defaultValue: string): any {
        if(Object.prototype.hasOwnProperty.call(req.query,paramName)) {
            return req.query[paramName]
        } else {
            return defaultValue
        }
    }
    public toNumber(strValue: string, defaultValue: number): number {
        let x = parseInt(strValue)
        if(x == NaN) {
            return defaultValue
        }
        return x
    }
    public getUrlParamInt(req: Request, paramName: string, defaultValue: number): number {
        let paramStrValue = this.getUrlParam(req,paramName,defaultValue.toString())
        let paramNumberValue = this.toNumber(paramStrValue,defaultValue)
        return paramNumberValue
    }

}

class _UtilReq {
    public createResponse(metadata: any, data: any): any {
        return { "metadata": metadata, "data": data }
    }
    public createResponseList(count_all: number,per_page: number, list: Array<any>) {
        let metadata = {
            "count_all": count_all,
            "per_page": per_page
        }
        return this.createResponse(metadata,list)
    }
    private createResponseAddOrUpdateFailure() {
        return this.createResponse({'success':false},{})
    }
    private createResponseAddOrUpdateSuccess(data: any) {
        return this.createResponse({'success':true},data)
    }
    public responseAddOrUpdateSuccess(res: Response,data:any) {
        res.status(200)
        res.json(this.createResponseAddOrUpdateSuccess(data))
    }
    public responseAddOrUpdateFailureClient(res:Response) {
        res.status(400)
        res.json(this.createResponseAddOrUpdateFailure())
    }
    public responseAddOrUpdateFailureServer(res:Response) {
        res.status(500)
        res.json(this.createResponseAddOrUpdateFailure())
    }
}

export const Util = new _Util()
export const UtilReq = new _UtilReq()
