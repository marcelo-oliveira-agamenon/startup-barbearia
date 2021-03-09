import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sale1615247930039 implements MigrationInterface {
  name = 'Sale1615247930039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sale" ("sale_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL DEFAULT '0', "discount" numeric(10,2) NOT NULL DEFAULT '0', "is_discount_fixed" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "client_id" uuid, "user_id" uuid, CONSTRAINT "PK_1f5c38463e847a2a0e74cf8035a" PRIMARY KEY ("sale_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_f2ac9b019aa29ebcfaecf7bb3cc" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_a3f82cec1dac6638fba3e732530" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_a3f82cec1dac6638fba3e732530"`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_f2ac9b019aa29ebcfaecf7bb3cc"`
    );

    await queryRunner.query(`DROP TABLE "sale"`);
  }
}
