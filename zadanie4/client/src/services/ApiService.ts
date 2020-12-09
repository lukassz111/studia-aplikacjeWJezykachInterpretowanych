
class _ApiService {
    private get ApiUrl(): string {
        return "//localhost:80/api"
    }
    private formatUrl(url: string): string {
        return this.ApiUrl+url;
    }
    async get(url: string, data: Object) {
        let xmlHttp = new XMLHttpRequest()
        xmlHttp.open("GET",this.ApiUrl+url)
    }
}

const ApiService: _ApiService = new _ApiService()

export { ApiService }