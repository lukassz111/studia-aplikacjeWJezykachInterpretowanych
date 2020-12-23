
class _ConfigService {
    config: any = {}
    constructor() {
        let fs = require("fs")
        let rawData = fs.readFileSync('config.json')
        this.config = JSON.parse(rawData)
        console.log({config:this.config})
    }
    get Config(): any {
        return this.config
    }
    get JWTToken(): string {
        return this.Config.jwt_token
    }
}
export const ConfigService = new _ConfigService()