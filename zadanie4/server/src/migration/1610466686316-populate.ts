import {MigrationInterface, QueryRunner} from "typeorm";
import { populateDown, populateUp } from "../dbutil/populate";

export class populate1610466686316 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        populateUp(queryRunner)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        populateDown(queryRunner)
    }

}
