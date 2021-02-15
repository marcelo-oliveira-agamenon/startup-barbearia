import { MigrationInterface, QueryRunner } from 'typeorm';

export class newPattern1613399821239 implements MigrationInterface {
  name = 'newPattern1613399821239';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_name"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_phone"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "phone" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "user_phone" character varying`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "user_name" character varying NOT NULL`
    );
  }
}
