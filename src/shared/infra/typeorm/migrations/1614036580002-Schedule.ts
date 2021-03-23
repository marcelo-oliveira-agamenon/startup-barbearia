import { MigrationInterface, QueryRunner } from 'typeorm';

export class Schedule1614036580002 implements MigrationInterface {
  name = 'Schedule1614036580002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "schedule" ("schedule_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" uuid NOT NULL, "client_id" uuid NOT NULL, "service_id" uuid NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "status" boolean NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, PRIMARY KEY ("schedule_id"), CONSTRAINT "FK_758b8ce7c18b9d347461b30228d" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id"), CONSTRAINT "FK_758b8ce7c18b9d347461b30228a" FOREIGN KEY ("client_id") REFERENCES "client" ("client_id"), CONSTRAINT "FK_758b8ce7c18b9d347461b30228q" FOREIGN KEY ("service_id") REFERENCES "service" ("service_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "schedule"`);
  }
}
