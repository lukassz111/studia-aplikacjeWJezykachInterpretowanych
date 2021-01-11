import { IPageRead } from "@/class/IPage"
import { Product } from "@/model/Product"
import { BehaviorSubject, Observable, Subscription } from "rxjs"
import { AuthService } from "./AuthService"

interface CartSummary {
    price: number,
    weight: number
}

class _CartService implements IPageRead<Product> {
    onUserStateChangedSubscription: Subscription
    onCartChanged: BehaviorSubject<null> = new BehaviorSubject<null>(null);
    listProducts: Array<Product>
    constructor() {
        this.listProducts = []
        this.onUserStateChangedSubscription = AuthService.OnUserStateChanged.subscribe(()=>{
            this.clear()
        })
    }
    public getOnCartChanged(): Observable<null> {
        return this.onCartChanged
    }
    public getLastPage(): number | null {
        return 0;
    }
    public getPageAsync(numberOfPage: number): Promise<Product[]> {
        const x = async () => {
            return this.listProducts
        }
        return x();
    }
    public getCartSummary(): CartSummary {
        let summary: CartSummary = {
            price: 0,
            weight: 0
        }
        this.listProducts.forEach((product: Product)=>{
            if(product == null) {
                return
            }
            summary.price += product.price
            summary.weight += product.weight
        })
        return summary;
    }
    public addProduct(product: Product) {
        this.listProducts.push(product);
        this.onCartChanged.next(null)
    }
    public clear() {
        this.listProducts = []
        this.onCartChanged.next(null)
    }
    public getList(): Array<Product> {
        return this.listProducts
    }
}
export const CartService = new _CartService()