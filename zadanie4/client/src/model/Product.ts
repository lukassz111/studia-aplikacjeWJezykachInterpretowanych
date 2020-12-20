import { Category } from "./Category"

export interface Product {
    id: number;
    category: Category
    name: String
    description: string
    price: number
    weight: number
}
