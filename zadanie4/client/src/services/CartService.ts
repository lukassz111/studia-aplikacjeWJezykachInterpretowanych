import { IPageRead } from "@/class/IPage"
import { Product } from "@/model/Product"
import { Subscription } from "rxjs"
import { AuthService } from "./AuthService"

interface CartSummary {
    price: number,
    weight: number
}

class _CartService implements IPageRead<Product> {
    onUserStateChangedSubscription: Subscription
    listProducts: Array<Product>
    constructor() {
        this.listProducts = []
        this.onUserStateChangedSubscription = AuthService.OnUserStateChanged.subscribe(()=>{
            this.clear()
        })
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
            summary.price += product.price
            summary.weight += product.weight
        })
        return summary;
    }
    public addProduct(product: Product) {
        this.listProducts.push(product);
    }
    public clear() {
        this.listProducts = []
    }
    public getList(): Array<Product> {
        return this.listProducts
    }
}
export const CartService = new _CartService()