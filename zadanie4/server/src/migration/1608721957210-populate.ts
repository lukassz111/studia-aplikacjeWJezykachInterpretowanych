import {MigrationInterface, QueryRunner} from "typeorm";
import { populateUp,populateDown } from "../dbutil/populate";

export class populate1608721957210 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        populateUp(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        populateDown(queryRunner)
    }

}
