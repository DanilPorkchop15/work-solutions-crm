import { convert, LocalDateTime, nativeJs } from "@js-joda/core";

interface LocalDateTimeTransformerTypes {
  to(v: LocalDateTime | null): Date | null;
  from(v: Date | null): LocalDateTime | null;
}

export const LocalDateTimeTransformer: LocalDateTimeTransformerTypes = {
  to(value: LocalDateTime | null): Date | null {
    return value && convert(value).toDate();
  },

  from(value: Date | null): LocalDateTime | null {
    return value && LocalDateTime.from(nativeJs(value));
  }
};
