import { MigrationInterface, QueryRunner } from 'typeorm';

export class SaleItems1616868135473 implements MigrationInterface {
  name = 'SaleItems1616868135473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sale_items" ("sale_items_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL DEFAULT '0', "quantity" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "sale_id" uuid, "product_id" uuid, "service_id" uuid, CONSTRAINT "CHK_f47d689cc1f1cc04a705e8fd4b" CHECK (CASE WHEN "product_id" <> NULL THEN "quantity" <> NULL AND "service_id" = NULL WHEN "quantity" <> NULL THEN "product_id" <> NULL AND "service_id" = NULL WHEN "service_id" <> NULL THEN "product_id" = NULL AND "quantity" = NULL END), CONSTRAINT "PK_c243e7fd173dd0c9060b4928220" PRIMARY KEY ("sale_items_id"))`
    );

    await queryRunner.query(
      `ALTER TABLE "sale_items" ADD CONSTRAINT "FK_c210a330b80232c29c2ad68462a" FOREIGN KEY ("sale_id") REFERENCES "sale_items"("sale_items_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sale_items" ADD CONSTRAINT "FK_4ecae62db3f9e9cc9a368d57adb" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sale_items" ADD CONSTRAINT "FK_7b1b80afaa6726b842001a8601c" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale_items" DROP CONSTRAINT "FK_7b1b80afaa6726b842001a8601c"`
    );
    await queryRunner.query(
      `ALTER TABLE "sale_items" DROP CONSTRAINT "FK_4ecae62db3f9e9cc9a368d57adb"`
    );
    await queryRunner.query(
      `ALTER TABLE "sale_items" DROP CONSTRAINT "FK_c210a330b80232c29c2ad68462a"`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "schedule"."created_at" IS NULL`
    );
    await queryRunner.query(`COMMENT ON COLUMN "stock"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "sale"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "service"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "client"."created_at" IS NULL`);
    await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
    await queryRunner.query(
      `COMMENT ON COLUMN "payment_method"."created_at" IS NULL`
    );
    await queryRunner.query(`DROP TABLE "sale_items"`);
  }
}
