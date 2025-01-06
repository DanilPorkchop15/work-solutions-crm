import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocumentComments1736125877952 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "document_comments"
      (
        "document_comment_id" uuid      NOT NULL DEFAULT uuid_generate_v4(),
        "text"                text      NOT NULL,
        "user_id"             uuid      NOT NULL,
        "document_id"         uuid      NOT NULL,
        "created_at"          timestamp NOT NULL DEFAULT now(),
        "updated_at"          timestamp NOT NULL DEFAULT now(),
        "deleted_at"          timestamp,

        CONSTRAINT "PK_document_comment_id" PRIMARY KEY ("document_comment_id"),
        CONSTRAINT "FK_user_id_document_comments" FOREIGN KEY ("user_id") REFERENCES "users" ("user_id") ON DELETE CASCADE,
        CONSTRAINT "FK_document_id_document_comments" FOREIGN KEY ("document_id") REFERENCES "documents" ("document_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "document_comments";
    `);
  }
}
