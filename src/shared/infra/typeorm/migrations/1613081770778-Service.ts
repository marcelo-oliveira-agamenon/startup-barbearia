import { MigrationInterface, QueryRunner } from 'typeorm';

export class Service1613081770778 implements MigrationInterface {
  name = 'Service1613081770778';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "service" ("service_id" SERIAL NOT NULL, "name" character varying NOT NULL, "value" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_48c5a0e13da2b2948fb7f3a0c4a" PRIMARY KEY ("service_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "service"`);
  }
}
