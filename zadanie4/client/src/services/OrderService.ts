import { Product } from "@/model/Product";
import { ApiService } from "./ApiService";

class _OrderService {
    public async addOrder(products: Array<Product>, phoneNumber: string): Promise<boolean> {
        let ids = products.map((product: Product) => {
            return product.id
        })
        console.log({"ids":ids,"phoneNumber":phoneNumber})
        let response = await ApiService.post('/orders',{"ids":ids,"phoneNumber":phoneNumber})
        return response.metadata['success']
    }
}
export const OrderService = new _OrderService()