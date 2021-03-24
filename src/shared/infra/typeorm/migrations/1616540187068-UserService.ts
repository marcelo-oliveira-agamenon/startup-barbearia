import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserService1616540187068 implements MigrationInterface {
  name = 'UserService1616540187068';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_service" ("user_id" uuid NOT NULL, "service_id" uuid NOT NULL, CONSTRAINT "PK_4159abfc0b72a5cd6e8081aa211" PRIMARY KEY ("user_id", "service_id"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_257201aaf76cde20d2ee8f69c7" ON "user_service" ("user_id") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_20861d1559a79e691cf889264b" ON "user_service" ("service_id") `
    );
    await queryRunner.query(
      `ALTER TABLE "user_service" ADD CONSTRAINT "FK_257201aaf76cde20d2ee8f69c73" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "user_service" ADD CONSTRAINT "FK_20861d1559a79e691cf889264b8" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_service" DROP CONSTRAINT "FK_20861d1559a79e691cf889264b8"`
    );
    await queryRunner.query(
      `ALTER TABLE "user_service" DROP CONSTRAINT "FK_257201aaf76cde20d2ee8f69c73"`
    );
    await queryRunner.query(`DROP INDEX "IDX_20861d1559a79e691cf889264b"`);
    await queryRunner.query(`DROP INDEX "IDX_257201aaf76cde20d2ee8f69c7"`);
    await queryRunner.query(`DROP TABLE "user_service"`);
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_758b8ce7c18b9d347461b30228q" FOREIGN KEY ("service_id") REFERENCES "service"("service_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_758b8ce7c18b9d347461b30228a" FOREIGN KEY ("client_id") REFERENCES "client"("client_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "schedule" ADD CONSTRAINT "FK_758b8ce7c18b9d347461b30228d" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}
