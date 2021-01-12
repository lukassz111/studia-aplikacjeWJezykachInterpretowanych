import {Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { Product } from "./Product";
import {State} from './State'
@Entity()
export class Order {
    @PrimaryGeneratedColumn('increment')
    id: number
    @Column()
    state: string
    @Column({type: "datetime", nullable: true})
    approveDate: string|null = null
    @Column()
    phone_number: string = ''
    @ManyToMany(type => Product) @JoinTable()
    products: Array<Product>
}
