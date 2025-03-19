import { isIsoDate } from "@frontend/shared/lib/isoDateUtils";
import { SystemClock } from "@frontend/shared/model/dateTime";
import Decoder, { field, number, succeed } from "jsonous";
import { isNil, last } from "ramda";
// eslint-disable-next-line import/no-extraneous-dependencies
import { err, ok } from "resulty";

export const identityValueDecoder: Decoder<unknown> = new Decoder<unknown>(ok);

export function fieldOrFallback<A, D extends A | null>(
  key: string,
  decoder: Decoder<A>,
  fallback: () => D | null = () => null
): Decoder<A | D | null> {
  return new Decoder<A | D | null>((data: Record<string, unknown>) => {
    if (isNil(data[key])) return ok(fallback());
    return field(key, decoder)
      .decodeAny(data)
      .cata({
        Ok: value => ok<string, A | D | null>(value),
        Err: () => ok<string, D | null>(fallback())
      });
  });
}

export function toObject<T extends object>(Class: new () => T): (obj: unknown) => Decoder<T> {
  return (obj: unknown) => succeed<T>(Object.assign<T, unknown>(new Class(), obj));
}

export function mergeRightDecoders<FIRST, SECOND>(
  firstDecoder: Decoder<FIRST>,
  secondDecoder: Decoder<SECOND>
): Decoder<FIRST & SECOND> {
  return new Decoder<FIRST & SECOND>((input: unknown) => {
    const first = firstDecoder.decodeAny(input);
    return first.andThen(firstValue =>
      secondDecoder.map(secondValue => ({ ...firstValue, ...secondValue })).decodeAny(input)
    );
  });
}

export function enumDecoder<ENUM extends object, KEY extends keyof ENUM>(matches: ENUM): Decoder<ENUM[KEY]> {
  return new Decoder<ENUM[KEY]>((key: KEY) => {
    if (matches[key]) return ok<string, ENUM[KEY]>(matches[key]);
    return err<string, ENUM[KEY]>(
      `enum decoder error.\nIncome ${JSON.stringify(key)};\nExpected: ${JSON.stringify(matches)}`
    );
  });
}

export const decodeNumberToString: Decoder<string> = number.map(num => num.toString());

export const ISODateDecoder: Decoder<ISO> = new Decoder<ISO>((value: unknown) => {
  if (typeof value !== "string") {
    return err(`Failed to parse ISO Date, expected to get string, got ${typeof value}: ${value}`);
  }

  if (!isIsoDate(value)) return err(`"${value}" is not a valid ISO string`);

  return ok(
    SystemClock.DateTime.fromISO(last(value) !== "Z" ? value + "Z" : value)
      .setZone("utc")
      .toISO()
  );
});
