import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeTypeOnComments1746464014322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE document_comments ALTER COLUMN "text" TYPE text;
      `);

    await queryRunner.query(`
        ALTER TABLE task_comments ALTER COLUMN "text" TYPE text;
      `);

    await queryRunner.query(`
        ALTER TABLE project_comments ALTER COLUMN "text" TYPE text;
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        ALTER TABLE document_comments ALTER COLUMN "text" TYPE varchar(255);
      `);

    await queryRunner.query(`
        ALTER TABLE task_comments ALTER COLUMN "text" TYPE varchar(255);
      `);

    await queryRunner.query(`
        ALTER TABLE project_comments ALTER COLUMN "text" TYPE varchar(255);
      `);
  }
}
