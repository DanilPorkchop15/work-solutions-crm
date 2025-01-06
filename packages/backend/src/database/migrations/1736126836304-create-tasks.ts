import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTasks1736126836304 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "task_status_enum" AS ENUM('active', 'inactive', 'paused', 'completed', 'canceled');

      CREATE TABLE "tasks" (
        "task_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(255) NOT NULL,
        "description" text,
        "start_date" timestamp,
        "end_date" timestamp,
        "status" "task_status_enum" NOT NULL DEFAULT 'active',
        "time_spent" int,
        "estimated_time" int,
        "user_created_id" uuid NOT NULL,
        "project_id" uuid NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,

        CONSTRAINT "PK_task_id" PRIMARY KEY ("task_id"),
        CONSTRAINT "FK_user_created_id_tasks" FOREIGN KEY ("user_created_id") REFERENCES "users"("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_project_id_tasks" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE
      );

      CREATE TABLE "tasks_users_accountable" (
        "task_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_tasks_users_accountable" PRIMARY KEY ("task_id", "user_id"),
        CONSTRAINT "FK_task_id_tasks_users_accountable" FOREIGN KEY ("task_id") REFERENCES "tasks"("task_id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_id_tasks_users_accountable" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "tasks_users_accountable";
      DROP TABLE "tasks";
      DROP TYPE "task_status_enum";
    `);
  }
}
