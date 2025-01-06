import { DateTimeFormatter, LocalDate } from "@js-joda/core";

interface LocalDateTransformerTypes {
  to(v: LocalDate | null): string | null;
  from(v: string | null): LocalDate | null;
}

export const LocalDateTransformer: LocalDateTransformerTypes = {
  to(value: LocalDate | null): string | null {
    if (value === null) {
      return null;
    }
    return value.format(DateTimeFormatter.ISO_LOCAL_DATE);
  },

  from(value: string | null): LocalDate | null {
    if (value === null) {
      return null;
    }

    return LocalDate.parse(value, DateTimeFormatter.ISO_LOCAL_DATE);
  }
};
