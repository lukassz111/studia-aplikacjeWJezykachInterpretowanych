import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class Category {
    @PrimaryColumn({type: 'varchar', length:20})
    public id: string = ''
    public toJson(): any {
        return this
    }
}
