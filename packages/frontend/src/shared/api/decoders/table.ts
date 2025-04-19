import Decoder, { array, succeed } from "jsonous";
import { assoc } from "ramda";

import { TableDto } from "../../model/interfaces/table";

export const tableDecoder: <T>(decoder: Decoder<T>) => Decoder<TableDto<T>> = <T>(
  decoder: Decoder<T>
): Decoder<TableDto<T>> =>
  succeed({})
    .assign("rows", array(decoder))
    .map(data => assoc("totalCount", data.rows.length, data));
