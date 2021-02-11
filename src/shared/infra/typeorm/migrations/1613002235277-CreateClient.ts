import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateClient1613002235277 implements MigrationInterface {
    name = 'CreateClient1613002235277'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("client_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "client_name" character varying NOT NULL, "client_phone" character varying(12), "client_mail" character varying, "client_cpf" character varying(14), "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_7510ce0a84bde51dbff978b4b49" PRIMARY KEY ("client_id"))`);
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "user"."created_at" IS NULL`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
