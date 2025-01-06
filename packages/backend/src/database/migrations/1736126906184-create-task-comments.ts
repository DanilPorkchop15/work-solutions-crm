import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTaskComments1736126906184 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "task_comments"
      (
        "task_comment_id" uuid      NOT NULL DEFAULT uuid_generate_v4(),
        "text"            text      NOT NULL,
        "user_id"         uuid      NOT NULL,
        "task_id"         uuid      NOT NULL,
        "created_at"      timestamp NOT NULL DEFAULT now(),
        "updated_at"      timestamp NOT NULL DEFAULT now(),
        "deleted_at"      timestamp,

        CONSTRAINT "PK_task_comment_id" PRIMARY KEY ("task_comment_id"),
        CONSTRAINT "FK_user_id_task_comments" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_task_id_task_comments" FOREIGN KEY ("task_id") REFERENCES "tasks" ("task_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "task_comments";
    `);
  }
}
