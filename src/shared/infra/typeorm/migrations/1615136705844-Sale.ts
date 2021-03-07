import { MigrationInterface, QueryRunner } from 'typeorm';

export class Sale1615136705844 implements MigrationInterface {
  name = 'Sale1615136705844';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sale" ("sale_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "discount" numeric(10,2) NOT NULL DEFAULT '0', "is_discount_fixed" boolean NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "clientClientId" uuid, "userUserId" uuid, CONSTRAINT "PK_1f5c38463e847a2a0e74cf8035a" PRIMARY KEY ("sale_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_30a80b84da4bd5c6fa4131035ff" FOREIGN KEY ("clientClientId") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" ADD CONSTRAINT "FK_044e6cc6bd49e1876425e7fe2bb" FOREIGN KEY ("userUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_044e6cc6bd49e1876425e7fe2bb"`
    );
    await queryRunner.query(
      `ALTER TABLE "sale" DROP CONSTRAINT "FK_30a80b84da4bd5c6fa4131035ff"`
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "payment_method"."created_at" IS NULL`
    );
    await queryRunner.query(`DROP TABLE "sale"`);
  }
}
