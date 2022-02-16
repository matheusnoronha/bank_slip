export class MoneyHelper {
  static formatMoney(value: string): string | null {
    const amount = String(parseInt(value, 10));

    if (!Number(amount)) {
      return null;
    }

    const decimalPlace = amount.slice(0, amount.length - 2);
    const formattedAmount = `${
      decimalPlace === '' ? '00' : decimalPlace
    }.${amount.slice(-2)}`;

    return formattedAmount;
  }
}
