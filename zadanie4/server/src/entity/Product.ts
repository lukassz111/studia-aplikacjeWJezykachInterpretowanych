import {Entity} from "typeorm"
import {Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Category } from "./Category"
@Entity()
export class Product {
    @PrimaryGeneratedColumn("increment")
    id: number
    @ManyToOne(type => Category, _category => _category.id)
    category: Category
    @Column()
    name: string
    @Column()
    description: string
    @Column()
    price: number
    @Column()
    weight: number
    
    public toJson(): any {
        return this
        /*let json = {
            id: this.id,
            //category_id: this.category.id,
            name: this.name,
            description: this.description,
            price: this.price,
            weight: this.weight
        }
        return json*/
    }
}
