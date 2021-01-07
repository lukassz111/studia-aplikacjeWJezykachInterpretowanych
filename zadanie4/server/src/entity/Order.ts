import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {State} from './State'
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number = 0
    @ManyToOne(type => State, _state => _state.id)
    state: State
    @Column({type: "datetime", nullable: true})
    approveDate: string|null = null
    @Column()
    username: string = ''
    @Column()
    email: string = ''
    @Column()
    phone_number: string = ''
    //------
    //ordersList = 0//Lista zamówionych towarów z liczbą zamówionych sztuk
    //Liczby całkowite dodatnie
}
