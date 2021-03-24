import {MigrationInterface, QueryRunner} from "typeorm";

export class Stock1615510844119 implements MigrationInterface {
    name = 'Stock1615510844119'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "stock" ("stock_id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "product_id" uuid, CONSTRAINT "REL_375ba760c8cff338fc8c94b416" UNIQUE ("product_id"), CONSTRAINT "PK_535f28fb720127de0997a5a866e" PRIMARY KEY ("stock_id"))`);
        await queryRunner.query(`ALTER TABLE "stock" ADD CONSTRAINT "FK_375ba760c8cff338fc8c94b416c" FOREIGN KEY ("product_id") REFERENCES "product"("product_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stock" DROP CONSTRAINT "FK_375ba760c8cff338fc8c94b416c"`);
        await queryRunner.query(`DROP TABLE "stock"`);
    }

}
