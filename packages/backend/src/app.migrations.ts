import { DataSourceOptions } from "typeorm";

export type EntitiesAndMigrationsOpts = Pick<DataSourceOptions, "entities" | "migrations">;

/**
 * This required because we supply TypeORM with our entities and migrations on start-up. This can
 * either be supplied as a path to a location where TypeORM is able to locate the compiled classes
 * and functions, e.g. dist/db/entities/*.js, or we can supply the entities one-by-one in the
 * data source configuration, both options have their downsides. It is not ideal to supply a path
 * because we are compiling a single bundle, and we do not want to supply each entity and migration
 * in the data source configuration because this soon becomes unmanageable as the size of the package
 * grows.
 *
 * Webpack gives us require.context, which allows us to get all matching modules from a given
 * directory. This means we can get all of our entities and migrations automatically, and supply
 * this to TypeORM in the data source configuration instead.
 *
 * https://spin.atomicobject.com/2020/12/21/typeorm-webpack/
 * https://webpack.js.org/guides/dependency-management/#requirecontext
 * https://github.com/nicolaspearson/nestjs.dellingr/blob/bb5b045b3b09f41b5637909f874868dbe6dba83d/src/common/config/database/database.config.service.ts
 */

const importAllFunctions = (requireContext: __WebpackModuleApi.RequireContext) =>
  requireContext
    .keys()
    .sort()
    .map(filename => {
      const required = requireContext(filename);
      return Object.keys(required).reduce((result, exportedKey) => {
        const exported = required[exportedKey];
        if (typeof exported === "function") {
          return result.concat(exported);
        }
        return result;
      }, [] as any);
    })
    .flat();

const entitiesViaWebpack: NonNullable<EntitiesAndMigrationsOpts["entities"]> = importAllFunctions(
  require.context("./models/entities/", true, /\.ts$/)
);
const migrationsViaWebpack: NonNullable<EntitiesAndMigrationsOpts["migrations"]> = importAllFunctions(
  require.context("./database/migrations/", true, /\.ts$/)
);

export const entitiesAndMigrations: EntitiesAndMigrationsOpts = {
  entities: entitiesViaWebpack,
  migrations: migrationsViaWebpack
};
