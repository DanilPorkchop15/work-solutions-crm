import Decoder, { field, number, succeed } from "jsonous";

import { Stats } from "../interfaces";

export const statsDecoder: Decoder<Stats> = succeed({})
  .assign("projects", field("projects", number))
  .assign("activeProjects", field("activeProjects", number))
  .assign("documents", field("documents", number))
  .assign("customers", field("customers", number));
