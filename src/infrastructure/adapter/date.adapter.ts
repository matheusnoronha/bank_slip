import { parseISO, addDays, format, isValid } from 'date-fns';

export class DateAdapter {
  static addDaysOfBankSlipInitialDate(addValue: number): string {
    const initialDate = parseISO('1997-10-07');
    return format(addDays(initialDate, addValue), 'yyyy-MM-dd');
  }

  static bankSlipPaymentDate(date: string): string | null {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    const formattedDate = `${year}-${month}-${day}`;
    const paymentDate = parseISO(formattedDate);
    if (!isValid(paymentDate)) {
      return null;
    }
    return formattedDate;
  }
}
