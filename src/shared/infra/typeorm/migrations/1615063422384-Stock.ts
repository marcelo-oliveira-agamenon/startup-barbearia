import {MigrationInterface, QueryRunner} from "typeorm";

export class Stock1615063422384 implements MigrationInterface {
    name = 'Stock1615063422384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("stock_id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "productProductId" uuid, CONSTRAINT "REL_7f18d98d77b734587c1e9f6ee4" UNIQUE ("productProductId"), CONSTRAINT "PK_535f28fb720127de0997a5a866e" PRIMARY KEY ("stock_id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_7f18d98d77b734587c1e9f6ee4" ON "stock" ("productProductId") `);
        await queryRunner.query(`COMMENT ON COLUMN "payment_method"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "service"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "client"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_7f18d98d77b734587c1e9f6ee40" FOREIGN KEY ("productProductId") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_7f18d98d77b734587c1e9f6ee40"`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "client"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "service"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."created_at" IS NULL`);
        await queryRunner.query(`COMMENT ON COLUMN "payment_method"."created_at" IS NULL`);
        await queryRunner.query(`DROP INDEX "IDX_7f18d98d77b734587c1e9f6ee4"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
