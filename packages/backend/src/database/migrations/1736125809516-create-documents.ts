import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDocuments1736125809516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "documents"
      (
        "document_id"     uuid         NOT NULL DEFAULT uuid_generate_v4(),
        "name"            varchar(255) NOT NULL,
        "description"     text,
        "user_created_id" uuid,
        "created_at"      timestamp    NOT NULL DEFAULT now(),
        "updated_at"      timestamp    NOT NULL DEFAULT now(),
        "deleted_at"      timestamp,

        CONSTRAINT "PK_document_id" PRIMARY KEY ("document_id"),
        CONSTRAINT "FK_user_created_id_documents" FOREIGN KEY ("user_created_id") REFERENCES "users" ("user_id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "documents";
    `);
  }
}
