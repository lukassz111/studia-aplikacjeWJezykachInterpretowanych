import {Entity} from "typeorm";
import {Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number = 0
    @Column()
    name: string = ''
}
