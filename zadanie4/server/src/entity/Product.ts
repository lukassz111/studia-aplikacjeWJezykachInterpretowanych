import {Entity} from "typeorm"
import {Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Category } from "./Category"
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number = 0
    @ManyToOne(type => Category, category => category.id)
    category_id: number = 0
    @Column()
    name: string = ''
    @Column()
    description: string = ''
    @Column()
    price: number = 0
    @Column()
    weight: number = 0
}
