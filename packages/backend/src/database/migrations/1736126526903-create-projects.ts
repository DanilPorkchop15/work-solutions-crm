import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProjects1736126526903 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "project_status_enum" AS ENUM('active', 'inactive', 'completed', 'canceled', 'paused');

      CREATE TABLE "projects" (
        "project_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" varchar(255) NOT NULL,
        "description" text,
        "start_date" timestamp NOT NULL,
        "end_date" timestamp NOT NULL,
        "budget" decimal(15, 2),
        "status" "project_status_enum" NOT NULL DEFAULT 'active',
        "user_id" uuid NOT NULL,
        "customer_id" uuid NOT NULL,
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,

        CONSTRAINT "PK_project_id" PRIMARY KEY ("project_id"),
        CONSTRAINT "FK_user_id_projects" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_customer_id_projects" FOREIGN KEY ("customer_id") REFERENCES "customers"("customer_id") ON DELETE CASCADE
      );

      CREATE TABLE "projects_users_accountable" (
        "project_id" uuid NOT NULL,
        "user_id" uuid NOT NULL,
        CONSTRAINT "PK_projects_users_accountable" PRIMARY KEY ("project_id", "user_id"),
        CONSTRAINT "FK_project_id_users_accountable" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_id_projects_accountable" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "projects_users_accountable";
      DROP TABLE "projects";
      DROP TYPE "project_status_enum";
    `);
  }
}
