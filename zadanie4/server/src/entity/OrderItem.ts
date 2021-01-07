import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";
import {State} from './State'
@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number = 0
    @ManyToOne(type => Product, _product => _product.id)
    product: Product
    @ManyToOne(type => Order, _order => _order.id)
    order: Order
}
