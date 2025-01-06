import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjectComments1736126614942 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "project_comments" (
        "project_comment_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "text" text NOT NULL,
        "user_id" uuid NOT NULL,
        "project_id" uuid NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,

        CONSTRAINT "PK_project_comment_id" PRIMARY KEY ("project_comment_id"),
        CONSTRAINT "FK_user_id_project_comments" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_project_id_project_comments" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "project_comments";
    `);
  }
}
