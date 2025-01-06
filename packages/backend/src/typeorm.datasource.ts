import { resolve } from "path";

import { DataSource } from "typeorm";

export const AppDataSource: DataSource = new DataSource({
  type: "postgres",
  host: "database",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "postgres",
  migrationsRun: true,
  migrations: [resolve(__dirname, "database", "migrations", "*.[t|j]s")]
});
