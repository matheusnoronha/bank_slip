export class BarCodeMod10Validation {
  validate(fields: string, dvBarCode: string): boolean {
    let sum = 0;
    const barCodeArray = fields.split('').reverse();

    barCodeArray.forEach((value, index) => {
      const multiplyValue = index % 2 === 0 ? 2 : 1;
      const operation = Number(value) * multiplyValue;

      if (operation > 9) {
        const stringOperation = String(operation);
        sum += Number(stringOperation[0]) + Number(stringOperation[1]);
      } else {
        sum += operation;
      }
    });

    const dv = 10 - (sum % 10);

    if (dv !== Number(dvBarCode) && dv !== 10) {
      console.log(dv, dvBarCode)
      return false;
    }
    return true;
  }
}
