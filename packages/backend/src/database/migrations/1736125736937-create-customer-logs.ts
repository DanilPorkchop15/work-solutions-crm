import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomerLogs1736125736937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "customer_logs"
      (
        "customer_log_id" uuid         NOT NULL DEFAULT uuid_generate_v4(),
        "action"          varchar(255) NOT NULL,
        "comment"         text,
        "user_id"         uuid,
        "customer_id"     uuid,

        CONSTRAINT "PK_customer_log_id" PRIMARY KEY ("customer_log_id"),
        CONSTRAINT "FK_user_id_customer_logs" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_customer_id_customer_logs" FOREIGN KEY ("customer_id") REFERENCES "customers" ("customer_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "customer_logs";
    `);
  }
}
