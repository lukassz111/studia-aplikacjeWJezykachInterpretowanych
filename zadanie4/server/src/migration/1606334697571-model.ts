import {MigrationInterface, QueryRunner} from "typeorm";

export class model1606334697571 implements MigrationInterface {
    name = 'model1606334697571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "category" ("id" varchar(20) PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "state" ("id" varchar(20) PRIMARY KEY NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approveDate" datetime, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "stateIdId" varchar(20))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "categoryIdId" varchar(20))`);
        await queryRunner.query(`CREATE TABLE "temporary_order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approveDate" datetime, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "stateIdId" varchar(20), CONSTRAINT "FK_5e65189222fa18138fc29755fea" FOREIGN KEY ("stateIdId") REFERENCES "state" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_order"("id", "approveDate", "username", "email", "phone_number", "stateIdId") SELECT "id", "approveDate", "username", "email", "phone_number", "stateIdId" FROM "order"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`ALTER TABLE "temporary_order" RENAME TO "order"`);
        await queryRunner.query(`CREATE TABLE "temporary_product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "categoryIdId" varchar(20), CONSTRAINT "FK_b62481426cb6f955ee9a74ffcfe" FOREIGN KEY ("categoryIdId") REFERENCES "category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_product"("id", "name", "description", "price", "weight", "categoryIdId") SELECT "id", "name", "description", "price", "weight", "categoryIdId" FROM "product"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`ALTER TABLE "temporary_product" RENAME TO "product"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" RENAME TO "temporary_product"`);
        await queryRunner.query(`CREATE TABLE "product" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "description" varchar NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "categoryIdId" varchar(20))`);
        await queryRunner.query(`INSERT INTO "product"("id", "name", "description", "price", "weight", "categoryIdId") SELECT "id", "name", "description", "price", "weight", "categoryIdId" FROM "temporary_product"`);
        await queryRunner.query(`DROP TABLE "temporary_product"`);
        await queryRunner.query(`ALTER TABLE "order" RENAME TO "temporary_order"`);
        await queryRunner.query(`CREATE TABLE "order" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approveDate" datetime, "username" varchar NOT NULL, "email" varchar NOT NULL, "phone_number" varchar NOT NULL, "stateIdId" varchar(20))`);
        await queryRunner.query(`INSERT INTO "order"("id", "approveDate", "username", "email", "phone_number", "stateIdId") SELECT "id", "approveDate", "username", "email", "phone_number", "stateIdId" FROM "temporary_order"`);
        await queryRunner.query(`DROP TABLE "temporary_order"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "category"`);
    }

}
