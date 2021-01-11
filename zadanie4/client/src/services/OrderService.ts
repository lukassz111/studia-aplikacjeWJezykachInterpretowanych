import { Product } from "@/model/Product";
import { ApiService } from "./ApiService";

class _OrderService {
    public async addOrder(products: Array<Product>): Promise<boolean> {
        let ids = products.map((product: Product) => {
            return product.id
        })
        let response = await ApiService.post('/orders',{"ids":ids})
        return response.metadata['success']
    }
}
export const OrderService = new _OrderService()