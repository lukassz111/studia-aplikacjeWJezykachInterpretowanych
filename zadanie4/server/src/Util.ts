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
export const Util = new _Util()