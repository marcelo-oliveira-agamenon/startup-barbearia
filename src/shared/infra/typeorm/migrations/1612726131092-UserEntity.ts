import {MigrationInterface, QueryRunner} from "typeorm";

export class UserEntity1612726131092 implements MigrationInterface {
    name = 'UserEntity1612726131092'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying NOT NULL, "user_type" character varying NOT NULL, "user_phone" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
