import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeletedAtToLogs1743370641623 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "customer_logs" ADD COLUMN "deleted_at" TIMESTAMP;
        ALTER TABLE "project_logs" ADD COLUMN "deleted_at" TIMESTAMP;
        ALTER TABLE "task_logs" ADD COLUMN "deleted_at" TIMESTAMP;
        ALTER TABLE "user_logs" ADD COLUMN "deleted_at" TIMESTAMP;
        ALTER TABLE "document_logs" ADD COLUMN "deleted_at" TIMESTAMP;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE "customer_logs" DROP COLUMN "deleted_at";
        ALTER TABLE "project_logs" DROP COLUMN "deleted_at";
        ALTER TABLE "task_logs" DROP COLUMN "deleted_at";
        ALTER TABLE "user_logs" DROP COLUMN "deleted_at";
        ALTER TABLE "document_logs" DROP COLUMN "deleted_at";
      `);
  }
}
