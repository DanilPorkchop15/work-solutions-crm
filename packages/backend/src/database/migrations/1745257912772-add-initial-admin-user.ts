import * as dotenv from "dotenv";
import { MigrationInterface, QueryRunner } from "typeorm";

dotenv.config();

export class AddInitialAdminUser1745257912772 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminEmail: string = process.env.ADMIN_EMAIL ?? "admin@worksolutions.ru";
    const adminPassword: string = process.env.ADMIN_PASSWORD ?? "worksolutions";

    await queryRunner.query(`
        INSERT INTO "users" ("full_name", "email", "password", "role")
        VALUES ('Admin', '${adminEmail}', '${adminPassword}', 'admin');
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminEmail: string = process.env.ADMIN_EMAIL ?? "admin@worksolutions.ru";

    await queryRunner.query(`
        DELETE FROM "users" WHERE "email" = '${adminEmail}';
      `);
  }
}
