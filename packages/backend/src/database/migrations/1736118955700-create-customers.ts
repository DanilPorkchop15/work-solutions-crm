import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCustomers1736118955700 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "customers"
      (
        "customer_id"     uuid         NOT NULL DEFAULT uuid_generate_v4(),
        "name"            varchar(255) NOT NULL,
        "email"           varchar(255) UNIQUE,
        "phone"           varchar(15),
        "inn"             varchar(12),
        "website"         varchar(255),
        "user_created_id" uuid,
        "created_at"      timestamp    NOT NULL DEFAULT now(),
        "updated_at"      timestamp    NOT NULL DEFAULT now(),
        "deleted_at"      timestamp,

        CONSTRAINT "PK_customer_id" PRIMARY KEY ("customer_id"),
        CONSTRAINT "FK_user_created_id" FOREIGN KEY ("user_created_id") REFERENCES "users" ("user_id") ON DELETE SET NULL
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "customers";
    `);
  }
}
