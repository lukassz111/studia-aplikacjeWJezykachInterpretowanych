import { IPageRead } from "@/class/IPage"
import { PageWithExpiry } from "@/class/Page"
import { Product } from "@/model/Product"
import { ApiService, Response } from "./ApiService"
import { SnackbarService } from "./SnackbarService"



class ReadPageProduct implements IPageRead<Product> {
    getLastPage(): number | null {
        return null
    }
    getPageAsync(numberOfPage: number): Promise<Product[]> {
        let url = "/products/"+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let dataArray: Array<any> = value.data as Array<any>
            let data = dataArray[0]
            let dataOrder: Product = {
                id: data.id,
                category: {
                    id: data.category
                },
                name: data.name,
                description: data.description,
                price: data.price,
                weight: data.weight,
            }
            return [dataOrder]
        })
    }
}
class PageProduct extends PageWithExpiry<Product> {
    protected fetch(numberOfPage: number): Promise<Array<Product>> {
        let url = "/products?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataProducts = data.map<Product>((data)=>{
                return {
                    id: data.id,
                    category: {
                        id: data.category
                    },
                    description: data.description,
                    name: data.name,
                    price: data.price,
                    weight: data.weight
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataProducts)
            return dataProducts
        })
    }
}
class _ProductService {
    private products: PageProduct
    private productById: ReadPageProduct
    public get Products(): PageProduct { return this.products }
    public get ProductById(): ReadPageProduct { return this.productById }
    constructor() {
        this.products = new PageProduct()
        this.productById = new ReadPageProduct()
    }
    public async addProduct(product: Product): Promise<Product|null> {
        let url = "/products"
        return ApiService.post(url,product).then((response: Response)=>{
            if(response.status == 200 && Object.prototype.hasOwnProperty.call(response.metadata,'success')) {
                if(response.metadata.success) {
                    this.Products.clear()
                    SnackbarService.addSnackbar({ message: "Dodano produkt pomyślnie", milliseconds: null })
                    return response.data
                } else {
                    SnackbarService.addSnackbar({ message: "Wystąpił błąd", milliseconds: null })
                }
            } else {
                SnackbarService.addSnackbar({ message: "Wystąpił błąd - HTTP: "+response.status, milliseconds: null })
            }
            return null
        })
    }
}

const ProductService: _ProductService = new _ProductService()

export { ProductService }