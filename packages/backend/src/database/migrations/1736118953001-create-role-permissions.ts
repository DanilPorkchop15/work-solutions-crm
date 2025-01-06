import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRolePermissions1736118953001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE "user_role_enum" AS ENUM('admin', 'user', 'moderator');
      CREATE TYPE "permission_object_enum" AS ENUM('users', 'customers', 'documents', 'tasks', 'projects');
      CREATE TYPE "permission_action_enum" AS ENUM('create', 'read', 'update', 'delete');

      CREATE TABLE "role_permissions" (
        "role_permission_id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "role" "user_role_enum" NOT NULL,
        "object" "permission_object_enum" NOT NULL,
        "action" "permission_action_enum" NOT NULL,
        CONSTRAINT "PK_role_permission_id" PRIMARY KEY ("role_permission_id"),
        CONSTRAINT "UQ_role_object_action" UNIQUE ("role", "object", "action")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "role_permissions";
      DROP TYPE "user_role_enum";
      DROP TYPE "permission_object_enum";
      DROP TYPE "permission_action_enum";
    `);
  }
}
