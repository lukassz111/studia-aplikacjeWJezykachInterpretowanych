import { PageWithExpiry } from "@/class/Page"
import { Product } from "@/model/Product"
import { Subscription } from "rxjs"
import { ApiService, Response } from "./ApiService"


class PageProduct extends PageWithExpiry<Product> {
    protected fetch(numberOfPage: number): Promise<Array<Product>> {
        let url = "/products?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<Product> = value.data as Array<Product>
            let countAll = value.metadata.count_all as number
            let perPage = value.metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,data)
            return data
        })
    }
}
class _ProductService {

    private products: PageProduct
    public get Products(): PageProduct { return this.products }

    constructor() {
        this.products = new PageProduct()
    }
}

const ProductService: _ProductService = new _ProductService()

export { ProductService }