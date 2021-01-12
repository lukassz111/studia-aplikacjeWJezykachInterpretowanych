import { PageWithExpiry } from "@/class/Page";
import { Order, OrderDetailed } from "@/model/Order";
import { Product } from "@/model/Product";
import { ApiService,Response } from "./ApiService";
import { IPageRead } from './../class/IPage'
import { StaticPage } from "@/class/StaticPage";
import { ProductService } from "./ProductService";
class PageAllOrder extends PageWithExpiry<Order> {
    protected fetch(numberOfPage: number): Promise<Array<Order>> {
        let url = "/orders?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataOrders = data.map<Order>((data)=>{
                return {
                    id: data.id,
                    approveDate: data.approveDate,
                    phone_number: data.phone_number,
                    state: data.state
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataOrders)
            return dataOrders
        })
    }
}

class PageNotApprovedOrder extends PageWithExpiry<Order> {
    protected fetch(numberOfPage: number): Promise<Array<Order>> {
        let url = "/orders/state/NOT_APPROVED/?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataOrders = data.map<Order>((data)=>{
                return {
                    id: data.id,
                    approveDate: data.approveDate,
                    phone_number: data.phone_number,
                    state: data.state
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataOrders)
            return dataOrders
        })
    }
}
class PageApprovedOrder extends PageWithExpiry<Order> {
    protected fetch(numberOfPage: number): Promise<Array<Order>> {
        let url = "/orders/state/APPROVED/?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataOrders = data.map<Order>((data)=>{
                return {
                    id: data.id,
                    approveDate: data.approveDate,
                    phone_number: data.phone_number,
                    state: data.state
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataOrders)
            return dataOrders
        })
    }
}
class PageCanceledOrder extends PageWithExpiry<Order> {
    protected fetch(numberOfPage: number): Promise<Array<Order>> {
        let url = "/orders/state/CANCELED/?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataOrders = data.map<Order>((data)=>{
                return {
                    id: data.id,
                    approveDate: data.approveDate,
                    phone_number: data.phone_number,
                    state: data.state
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataOrders)
            return dataOrders
        })
    }
}
class PageCompletedOrder extends PageWithExpiry<Order> {
    protected fetch(numberOfPage: number): Promise<Array<Order>> {
        let url = "/orders/state/COMPLETED/?page="+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let data: Array<any> = value.data as Array<any>
            let metadata: any = value.metadata;
            let dataOrders = data.map<Order>((data)=>{
                return {
                    id: data.id,
                    approveDate: data.approveDate,
                    phone_number: data.phone_number,
                    state: data.state
                }
            })
            let countAll = metadata.count_all as number
            let perPage = metadata.per_page as number
            this.perPage = perPage
            this.countAll = countAll
            this.setPage(numberOfPage,dataOrders)
            return dataOrders
        })
    }
}

class ReadPageOrderDetailed implements IPageRead<OrderDetailed> {
    getLastPage(): number | null {
        return null
    }
    getPageAsync(numberOfPage: number): Promise<OrderDetailed[]> {
        let url = "/orders/"+numberOfPage
        return ApiService.get(url).then((value: Response)=> {
            let dataArray: Array<any> = value.data as Array<any>
            let data = dataArray[0]
            let dataOrder: OrderDetailed = {
                id: data.id,
                approveDate: data.approveDate,
                phone_number: data.phone_number,
                state: data.state,
                products: data.products
            }
            console.log(data)
            return [dataOrder]
        })
    }
}


class _OrderService {
    private all: PageAllOrder
    private notApproved: PageNotApprovedOrder
    private approved: PageApprovedOrder
    private canceled: PageCanceledOrder
    private completed: PageCompletedOrder
    private detailed: ReadPageOrderDetailed
    public get AllOrders(): PageAllOrder { return this.all }
    public get NotApprovedOrders(): PageNotApprovedOrder { return this.notApproved }
    public get ApprovedOrders(): PageApprovedOrder { return this.approved }
    public get CanceledOrders(): PageCanceledOrder { return this.canceled }
    public get CompletedOrders(): PageCompletedOrder { return this.completed }
    public get DetailedOrder(): ReadPageOrderDetailed { return this.detailed }
    constructor() {
        this.all = new PageAllOrder()
        this.notApproved = new PageNotApprovedOrder()
        this.approved = new PageApprovedOrder()
        this.canceled = new PageCanceledOrder()
        this.completed = new PageCompletedOrder()
        this.detailed = new ReadPageOrderDetailed()
    }
    public async addOrder(products: Array<Product>, phoneNumber: string): Promise<boolean> {
        let ids = products.map((product: Product) => {
            return product.id
        })
        console.log({"ids":ids,"phoneNumber":phoneNumber})
        let response = await ApiService.post('/orders',{"ids":ids,"phoneNumber":phoneNumber})
        this.all.clear()
        this.notApproved.clear()
        return response.metadata['success']
    }
    public async getProductsListForOrder(order: OrderDetailed): Promise<StaticPage<Product>> {
        let products: Array<Product> = []
        for(let i = 0; i < order.products.length; i++) {
            let productId = order.products[i]
            let product = await ProductService.ProductById.getPageAsync(productId)
            if(product.length > 0) {
                products.push(product[0])
            }
        }
        return new StaticPage<Product>(products)
    }
    public async updateState(order: Order, state: string) {
        this.AllOrders.clear()
        this.ApprovedOrders.clear()
        this.NotApprovedOrders.clear()
        this.CanceledOrders.clear()
        this.CompletedOrders.clear()
        let x = await ApiService.put('/orders/'+order.id+'/state',{"state":state})
        return x
    }
}
export const OrderService = new _OrderService()