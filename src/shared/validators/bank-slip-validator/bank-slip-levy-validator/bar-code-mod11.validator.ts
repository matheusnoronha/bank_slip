export class BarCodeMod11Validation {
  validate(bankSlipBarCode: string, dvBarCode: string): boolean {
    const barCodeArray = bankSlipBarCode.split('').reverse();
    let sum = 0;
    let multiplyValue = 2;
    barCodeArray.forEach((value) => {
      sum += Number(value) * multiplyValue;
      multiplyValue = multiplyValue === 9 ? 2 : multiplyValue + 1;
    });

    const result = sum % 11;
    let dv: number;

    if (result === 0 || result === 1) {
      dv = 0;
    } else if (result === 10) {
      dv = 1;
    } else {
      dv = 11 - result;
    }
    if (dv !== Number(dvBarCode)) {
      return false;
    }
    return true;
  }
}
