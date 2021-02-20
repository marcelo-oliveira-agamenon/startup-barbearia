import {MigrationInterface, QueryRunner} from "typeorm";

export class Product1613861054388 implements MigrationInterface {
    name = 'Product1613861054388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "product" ("product_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cost" integer, "price" integer NOT NULL, "description" character varying, "discount" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_1de6a4421ff0c410d75af27aeee" PRIMARY KEY ("product_id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "service"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "client"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "client"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "service"."created_at" IS NULL`);
        await queryRunner.query(`DROP TABLE "product"`);
    }

}
