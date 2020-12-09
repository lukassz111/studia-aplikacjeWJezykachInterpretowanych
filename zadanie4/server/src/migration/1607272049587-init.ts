import {MigrationInterface, QueryRunner} from "typeorm";

export class init1607272049587 implements MigrationInterface {
    name = 'init1607272049587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar(20) PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "state" ("id" varchar(20) PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approveDate" datetime, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "stateId" varchar(20))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "categoryId" varchar(20))`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approveDate" datetime, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "stateId" varchar(20), CONSTRAINT "FK_092d69b960930ca1d5a5d86c9c5" FOREIGN KEY ("stateId") REFERENCES "state" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "approveDate", "username", "email", "phone_number", "stateId") SELECT "id", "approveDate", "username", "email", "phone_number", "stateId" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "categoryId" varchar(20), CONSTRAINT "FK_ff0c0301a95e517153df97f6812" FOREIGN KEY ("categoryId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "description", "price", "weight", "categoryId") SELECT "id", "name", "description", "price", "weight", "categoryId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "categoryId" varchar(20))`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "description", "price", "weight", "categoryId") SELECT "id", "name", "description", "price", "weight", "categoryId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approveDate" datetime, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "stateId" varchar(20))`);
        await queryRunner.query(`INSERT INTO "order"("id", "approveDate", "username", "email", "phone_number", "stateId") SELECT "id", "approveDate", "username", "email", "phone_number", "stateId" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
