import {Entity, PrimaryColumn} from "typeorm";


// INSERT INTO "state" ("name") VALUES ("NOT_APPROVED"), ("APPROVED"), ("CANCELED"), ("COMPLETED")
@Entity()
export class State {
    @PrimaryColumn({type: 'varchar', length:20})
    public id: string = ''
}
