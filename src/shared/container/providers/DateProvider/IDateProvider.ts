interface IDateProvider {
  dateDiff(start_date: Date, end_date: Date, unit?: string): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
}

export { IDateProvider };
