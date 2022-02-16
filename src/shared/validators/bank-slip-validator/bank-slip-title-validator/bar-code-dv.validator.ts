export class BarCodeDVValidation {
  validate(bankSlipBarCode: string, dvBarCode: string): boolean {
    const barCodeArray = (
      bankSlipBarCode.slice(0, 4) + bankSlipBarCode.slice(5)
    )
      .split('')
      .reverse();
    let sum = 0;
    let multiplyValue = 2;
    barCodeArray.forEach((value) => {
      sum += Number(value) * multiplyValue;
      multiplyValue = multiplyValue === 9 ? 2 : multiplyValue + 1;
    });

    const result = 11 - (sum % 11);

    const dv = result === 0 || result === 10 || result === 11 ? 1 : result;

    if (dv !== Number(dvBarCode)) {
      throw new Error(`Invalid Bar code check digit`);
    }

    return true;
  }
}
