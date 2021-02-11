import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1612910887240 implements MigrationInterface {
  name = 'User1612910887240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user_user_type_enum" AS ENUM ('admin', 'normal');
`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "user_type" "user_user_type_enum" NOT NULL DEFAULT 'normal', "user_phone" character varying(12), "password" character varying(255) NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "user_user_type_enum"`);
  }
}
