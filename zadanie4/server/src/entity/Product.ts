import {Entity} from "typeorm"
import {Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm"
import { Category } from "./Category"
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number = 0
    @ManyToOne(type => Category, _category => _category.id)
    category: string = ''
    @Column()
    name: string = ''
    @Column()
    description: string = ''
    @Column()
    price: number = 0
    @Column()
    weight: number = 0
}
