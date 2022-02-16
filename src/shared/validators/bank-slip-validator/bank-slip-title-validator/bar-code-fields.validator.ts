import { MathHelper } from '@/shared/utils/math.utils';

export class BarCodeFieldsTitleValidation {
  validate(fields: string[], dvFields: string[]): boolean {
    const dvs: number[] = [];
    let sum = 0;
    fields.forEach((value, index) => {
      const multiplyValue = index % 2 === 0 ? 2 : 1;
      const operation = Number(value) * multiplyValue;

      if (operation > 9) {
        const stringOperation = String(operation);
        sum += Number(stringOperation[0]) + Number(stringOperation[1]);
      } else {
        sum += operation;
      }
      if (index === 8 || index === 18 || index === fields.length - 1) {
        dvs.push(sum);
        sum = 0;
      }
    });

    dvs.forEach((value, index) => {
      const roundValue = MathHelper.roundTen(value);
      if (roundValue - value !== Number(dvFields[index])) {
        throw new Error(`Field ${index + 1} is invalid`);
      }
    });

    return true;
  }
}
