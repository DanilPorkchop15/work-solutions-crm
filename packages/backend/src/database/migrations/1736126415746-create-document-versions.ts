import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocumentVersions1736126415746 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "document_versions"
      (
        "document_version_id" uuid         NOT NULL DEFAULT uuid_generate_v4(),
        "document_url"        varchar(255) NOT NULL,
        "version"             int          NOT NULL,
        "document_id"         uuid         NOT NULL,
        "user_created_id"     uuid         NOT NULL,
        "created_at"          timestamp    NOT NULL DEFAULT now(),
        "updated_at"          timestamp    NOT NULL DEFAULT now(),
        "deleted_at"          timestamp,

        CONSTRAINT "PK_document_version_id" PRIMARY KEY ("document_version_id"),
        CONSTRAINT "FK_document_id_document_versions" FOREIGN KEY ("document_id") REFERENCES "documents" ("document_id") ON DELETE CASCADE,
        CONSTRAINT "FK_user_created_id_document_versions" FOREIGN KEY ("user_created_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "document_versions";
    `);
  }
}
