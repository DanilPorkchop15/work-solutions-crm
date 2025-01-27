import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocumentPermissions1736126386513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "document_permissions"
      (
        "document_permission_id" uuid        NOT NULL DEFAULT uuid_generate_v4(),
        "document_id"            uuid        NOT NULL,
        "role"                   "role_enum" NOT NULL,
        CONSTRAINT "PK_document_permission_id" PRIMARY KEY ("document_permission_id"),
        CONSTRAINT "FK_document_id_document_permissions" FOREIGN KEY ("document_id") REFERENCES "documents" ("document_id") ON DELETE CASCADE,
        CONSTRAINT "UQ_document_role" UNIQUE ("document_id", "role")
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "document_permissions";
    `);
  }
}
