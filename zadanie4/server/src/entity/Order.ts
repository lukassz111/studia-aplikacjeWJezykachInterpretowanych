import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {State} from './State'
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number = 0
    @ManyToOne(type => State, state => state.id)
    state_id: number = 0
    @Column({type: "datetime", nullable: true})
    approveDate: string|null = null
    @Column()
    username: string = ''
    @Column()
    email: string = ''
    @Column()
    phone_number: string = ''
    
    
}
