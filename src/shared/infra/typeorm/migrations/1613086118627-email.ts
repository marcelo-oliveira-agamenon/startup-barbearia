import { MigrationInterface, QueryRunner } from 'typeorm';

export class email1613086118627 implements MigrationInterface {
  name = 'email1613086118627';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
  }
}
