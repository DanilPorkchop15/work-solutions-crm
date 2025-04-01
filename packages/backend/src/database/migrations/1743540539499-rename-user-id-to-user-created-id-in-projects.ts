import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameUserIdToUserCreatedIdInProjects1743540539499 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "projects"
        RENAME COLUMN "user_id" TO "user_created_id";
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "projects"
        RENAME COLUMN "user_created_id" TO "user_id";
    `);
  }
}
