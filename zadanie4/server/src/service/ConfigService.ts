
class _ConfigService {
    config: Object = {}
    constructor() {
        let fs = require("fs")
        let rawData = fs.readFileSync('config.json')
        this.config = JSON.parse(rawData)
        console.log({config:this.config})
    }
    get Config(): Object {
        return this.config
    }
}
export const ConfigService = new _ConfigService()