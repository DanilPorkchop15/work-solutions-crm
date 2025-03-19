import { addAlias } from "module-alias";

import "reflect-metadata";

import { mountApp } from "./app";

addAlias("@frontend", __dirname);

mountApp();
