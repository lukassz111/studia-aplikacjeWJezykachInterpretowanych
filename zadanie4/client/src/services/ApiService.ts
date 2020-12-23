interface Response {
    status: number,
    data: any,
    metadata: any
}
class _ApiService {
    private get ApiUrl(): string {
        return "/api"
    }
    private setHeaders(xmlHttpRequest: XMLHttpRequest) {
        xmlHttpRequest.setRequestHeader("Content-Type","application/json")
        xmlHttpRequest.setRequestHeader("Accept","application/json")
    }
    private formatUrl(url: string): string {
        return this.ApiUrl+url;
    }

    async get(url: string): Promise<Response> {
        let req = new XMLHttpRequest()
        req.open("GET",this.formatUrl(url),false)
        this.setHeaders(req)
        req.send(null)
        let jsonResponse = JSON.parse(req.responseText)
        return {
            status: req.status,
            data: jsonResponse['data'],
            metadata: jsonResponse['metadata']
        };
    }
    async post(url: string,data: any)/*: Promise<Response>*/ {
        let req = new XMLHttpRequest()
        req.open("POST",this.formatUrl(url),false)
        this.setHeaders(req)
        req.send(JSON.stringify(data))
        let jsonResponse = JSON.parse(req.responseText)
        return {
            status: req.status,
            data: jsonResponse['data'],
            metadata: jsonResponse['metadata']
        };
    }
}

const ApiService: _ApiService = new _ApiService()

export { ApiService, Response }