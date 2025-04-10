import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshTokenToUser1737395779169 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" ADD COLUMN "refresh_token" text;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "refresh_token";
        `);
  }
}
