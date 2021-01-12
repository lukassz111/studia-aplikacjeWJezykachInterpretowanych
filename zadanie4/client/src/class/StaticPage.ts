import { Product } from "@/model/Product"
import { ApiService } from "@/services/ApiService"
import { IPageRead } from "./IPage"

export class StaticPage<T> implements IPageRead<T> {
    private items: Array<T>
    constructor(items: Array<T>) {
        this.items = items
    }
    getLastPage(): number | null {
        return 0
    }
    getPageAsync(numberOfPage: number): Promise<Array<T>> {
        let x = async () => {
            return this.items
        }
        return x()
    }
}