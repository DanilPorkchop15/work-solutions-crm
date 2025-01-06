import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectLogs1736126656187 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "project_logs" (
        "project_log_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "action" varchar(255) NOT NULL,
        "comment" text,
        "user_id" uuid NOT NULL,
        "project_id" uuid NOT NULL,

        CONSTRAINT "PK_project_log_id" PRIMARY KEY ("project_log_id"),
        CONSTRAINT "FK_user_id_project_logs" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_project_id_project_logs" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "project_logs";
    `);
  }
}
