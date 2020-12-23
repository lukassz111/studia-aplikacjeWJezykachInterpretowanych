import { Category } from "./Category"

export interface Product {
    id: number|null;
    category: Category
    name: String
    description: string
    price: number
    weight: number
}

export const ProductFactory = (id: number|null, category: Category, name: string, description: string, price: number, weight: number): Product => {
    return {
        "id": id,
        "category":category,
        "name": name,
        "description":description,
        "price":price,
        "weight":weight
    }
}