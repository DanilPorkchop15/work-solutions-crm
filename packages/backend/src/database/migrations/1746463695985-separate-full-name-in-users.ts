import { MigrationInterface, QueryRunner } from "typeorm";

export class SeparateFullNameInUsers1746463695985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users"
        RENAME COLUMN "full_name" TO "first_name";
      `);

    await queryRunner.query(`
        ALTER TABLE "users"
        ADD COLUMN "last_name" varchar (255);
      `);

    await queryRunner.query(`
      UPDATE "users"
      SET "last_name" = '';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "users"
        RENAME COLUMN "first_name" TO "full_name";
      `);

    await queryRunner.query(`
        ALTER TABLE "users"
        DROP COLUMN "last_name";
      `);
  }
}
