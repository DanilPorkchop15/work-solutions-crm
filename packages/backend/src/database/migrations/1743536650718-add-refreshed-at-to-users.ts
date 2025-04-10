import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRefreshedAtToUsers1743536650718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
        ADD "refreshed_at" TIMESTAMP WITH TIME ZONE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
        DROP COLUMN "refreshed_at";
    `);
  }
}
