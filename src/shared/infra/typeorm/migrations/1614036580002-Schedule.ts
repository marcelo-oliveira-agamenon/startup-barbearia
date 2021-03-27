import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedule1614036580002 implements MigrationInterface {
  name = 'Schedule1614036580002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("schedule_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "status" boolean NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, "user_id" uuid, "client_id" uuid, "service_id" uuid, CONSTRAINT "PK_e2f8b8dde7d240896cd58c669a2" PRIMARY KEY ("schedule_id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_c9927b15da3efbbfb7f29928216" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_c192d4610a2c250924db12c4395" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_aeec1ea313799187cac733f5481" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_aeec1ea313799187cac733f5481"`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_c192d4610a2c250924db12c4395"`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" DROP CONSTRAINT "FK_c9927b15da3efbbfb7f29928216"`
    );
    await queryRunner.query(`DROP TABLE "schedule"`);
  }
}
