import {MigrationInterface, QueryRunner} from "typeorm";

export class Stock1614821465186 implements MigrationInterface {
    name = 'Stock1614821465186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("stock_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "productsProductId" uuid, CONSTRAINT "REL_5cbd6f874e3bdc4096d2b43bca" UNIQUE ("productsProductId"), CONSTRAINT "PK_535f28fb720127de0997a5a866e" PRIMARY KEY ("stock_id"))`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_5cbd6f874e3bdc4096d2b43bca6" FOREIGN KEY ("productsProductId") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_5cbd6f874e3bdc4096d2b43bca6"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
