import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAffectedUserIdToUserLog1745079537080 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user_logs"
        ADD COLUMN "affected_user_id" uuid REFERENCES "users" ("user_id");
      DELETE
      FROM "user_logs"
      WHERE "affected_user_id" IS NULL;
      ALTER TABLE "user_logs"
        ALTER COLUMN "affected_user_id" SET NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user_logs" DROP COLUMN "affected_user_id";
        `);
  }
}
