const { NxWebpackPlugin } = require("@nx/webpack");
const { join } = require("path");
const CopyPlugin = require("copy-webpack-plugin");

class WatchRunPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap("WatchRun", comp => {
      if (comp.modifiedFiles) {
        const changedFiles = Array.from(comp.modifiedFiles, file => `\n  ${file}`).join("");
        console.log("===============================");
        console.log("FILES CHANGED:", changedFiles);
        console.log("===============================");
      }
    });
  }
}

module.exports = {
  output: {
    path: join(__dirname, "../../dist/packages/backend")
  },
  plugins: [
    new NxWebpackPlugin({
      target: "node",
      compiler: "tsc",
      main: "./src/main.ts",
      tsConfig: "./tsconfig.app.json",
      assets: [],
      optimization: false,
      outputHashing: "none",
      sourceMap: true
    }),
    process.env.NODE_ENV !== "development"
      ? undefined
      : new CopyPlugin({ patterns: [{ from: join(__dirname, "*g.y*ml"), to: join(__dirname, "../../dist") }] }),
    new WatchRunPlugin()
  ]
};
