import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskLogs1736127182783 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "task_logs"
      (
        "task_log_id" uuid         NOT NULL DEFAULT uuid_generate_v4(),
        "action"      varchar(255) NOT NULL,
        "comment"     text,
        "user_id"     uuid         NOT NULL,
        "task_id"     uuid         NOT NULL,

        "created_at"  timestamp    NOT NULL DEFAULT now(),
        "updated_at"  timestamp    NOT NULL DEFAULT now(),
        "deleted_at"  timestamp,

        CONSTRAINT "PK_task_log_id" PRIMARY KEY ("task_log_id"),
        CONSTRAINT "FK_user_id_task_logs" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_task_id_task_logs" FOREIGN KEY ("task_id") REFERENCES "tasks" ("task_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "task_logs";
    `);
  }
}
