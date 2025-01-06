import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1736118954040 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "users" (
        "user_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "full_name" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL UNIQUE,
        "password" varchar(255) NOT NULL,
        "position" varchar(255),
        "role" "user_role_enum" NOT NULL DEFAULT 'user',
        "avatarUrl" varchar(500),
        "created_at" timestamp NOT NULL DEFAULT now(),
        "updated_at" timestamp NOT NULL DEFAULT now(),
        "deleted_at" timestamp,

        CONSTRAINT "PK_user_id" PRIMARY KEY ("user_id")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "users";
    `);
  }
}
