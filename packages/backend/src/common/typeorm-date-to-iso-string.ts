export const typeormDateToIsoString: (date: Date) => string = (date: Date): string => new Date(date).toISOString();

export const typeormNullableDateToIsoString: (date: Date | null | undefined) => string | undefined = (
  date: Date | null | undefined
): string | undefined => (date ? new Date(date).toISOString() : undefined);
