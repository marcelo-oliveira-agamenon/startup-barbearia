import { MigrationInterface, QueryRunner } from 'typeorm';

export class PaymentMethod1614125486478 implements MigrationInterface {
  name = 'PaymentMethod1614125486478';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "payment_method" ("payment_method_id" SERIAL NOT NULL, "name" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_6101666760258a840e115e1bb11" UNIQUE ("name"), CONSTRAINT "PK_ed16884cd19aa06b5eafbf0e013" PRIMARY KEY ("payment_method_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payment_method"`);
  }
}
