import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreatedAtToLogTables1736371051788 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task_logs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "project_logs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "document_logs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "user_logs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    await queryRunner.query(`ALTER TABLE "customer_logs" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "customer_logs" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "user_logs" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "document_logs" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "project_logs" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "task_logs" DROP COLUMN "created_at"`);
  }
}
