import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase0000000000001 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  }

  down(_: QueryRunner): Promise<void> {
    return Promise.resolve();
  }
}
