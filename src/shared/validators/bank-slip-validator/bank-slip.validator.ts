export class LineCodeValidation {
  validate(bankSlipLineCode: string): void {
    if (!/^[0-9]/.test(bankSlipLineCode)) {
      throw new Error('Code is not a number');
    }

    const [firstDigit] = bankSlipLineCode;
    if (
      (firstDigit !== '8' && bankSlipLineCode.length !== 47) ||
      (firstDigit === '8' && bankSlipLineCode.length !== 48)
    ) {
      throw new Error('Invalid code size');
    }
  }
}
