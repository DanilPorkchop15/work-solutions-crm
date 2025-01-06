import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserLogs1736127248217 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "user_logs"
      (
        "user_log_id" uuid         NOT NULL DEFAULT uuid_generate_v4(),
        "action"      varchar(255) NOT NULL,
        "comment"     text,
        "user_id"     uuid         NOT NULL,

        "created_at"  timestamp    NOT NULL DEFAULT now(),
        "updated_at"  timestamp    NOT NULL DEFAULT now(),
        "deleted_at"  timestamp,

        CONSTRAINT "PK_user_log_id" PRIMARY KEY ("user_log_id"),
        CONSTRAINT "FK_user_id_user_logs" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "user_logs";
    `);
  }
}
