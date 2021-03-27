import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentMovement1616883406505 implements MigrationInterface {
  name = 'PaymentMovement1616883406505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_movement" ("payment_movement_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(10,2) NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP WITH TIME ZONE, "payment_method_id" integer, "sale_id" uuid, CONSTRAINT "REL_ca4ea5e1db31bb315e68169e52" UNIQUE ("payment_method_id"), CONSTRAINT "PK_1b07e6b3bea86251cd2ff126cd6" PRIMARY KEY ("payment_movement_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_movement" ADD CONSTRAINT "FK_ca4ea5e1db31bb315e68169e52b" FOREIGN KEY ("payment_method_id") REFERENCES "payment_method"("payment_method_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_movement" ADD CONSTRAINT "FK_4b21a5ff44277c8b6708787752a" FOREIGN KEY ("sale_id") REFERENCES "sale"("sale_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "payment_movement" DROP CONSTRAINT "FK_4b21a5ff44277c8b6708787752a"`
    );
    await queryRunner.query(
      `ALTER TABLE "payment_movement" DROP CONSTRAINT "FK_ca4ea5e1db31bb315e68169e52b"`
    );
    await queryRunner.query(`DROP TABLE "payment_movement"`);
  }
}
