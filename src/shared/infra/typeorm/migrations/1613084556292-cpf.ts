import { MigrationInterface, QueryRunner } from 'typeorm';

export class cpf1613084556292 implements MigrationInterface {
  name = 'cpf1613084556292';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "cpf" character varying(14) NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(12) NOT NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "cpf"`);
  }
}
