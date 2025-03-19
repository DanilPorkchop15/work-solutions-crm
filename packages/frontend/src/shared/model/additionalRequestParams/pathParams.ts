import { Model } from "../abstractModel";
import type { PathParamsModel } from "../interfaces";

export class PathParams<TYPE extends object> extends Model<TYPE> implements PathParamsModel<TYPE> {}
