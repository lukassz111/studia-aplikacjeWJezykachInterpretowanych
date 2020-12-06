import {MigrationInterface, QueryRunner} from "typeorm";
import { populateUp, populateDown } from "../dbutil/populate";

export class populate1607271683553 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        populateUp(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        populateDown(queryRunner)
    }

}
