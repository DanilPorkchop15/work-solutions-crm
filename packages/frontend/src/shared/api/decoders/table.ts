import type { TableDto } from "@frontend/shared/model/interfaces";
import Decoder, { array, field, succeed } from "jsonous";
import { assoc } from "ramda";

export const tableDecoder: <T>(decoder: Decoder<T>) => Decoder<TableDto<T>> = <T>(
  decoder: Decoder<T>
): Decoder<TableDto<T>> =>
  succeed({})
    .assign("rows", array(decoder))
    .map(data => assoc("totalCount", data.rows.length, data));
