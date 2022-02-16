import { Injectable } from '@nestjs/common';
import { BankSlipLevyDecodedDto } from '@/presentation/dtos/bank-slip-levy/bank-slip-levy-decoded.dto';
import { BarCodeMod10Validation } from './bar-code-mod10.validator';
import { BarCodeMod11Validation } from './bar-code-mod11.validator';
import { BarCodeFieldsLevyValidation } from './bar-code-fields.validator';

@Injectable()
export class BarCodeLevyValidation {
  constructor(
    private readonly barCodeMod10Validation: BarCodeMod10Validation,
    private readonly barCodeMod11Validation: BarCodeMod11Validation,
    private readonly barCodeFieldsLevyValidation: BarCodeFieldsLevyValidation,
  ) {}

  validate(
    bankSlipData: BankSlipLevyDecodedDto,
    bankSlipBarCode: string,
  ): boolean {
    const { coinCode, dvBankSlipBarCode } = bankSlipData;
    const barCodeWithoutDv =
      bankSlipBarCode.slice(0, 3) + bankSlipBarCode.slice(4);

    if (coinCode === '6' || coinCode === '7') {
      this.barCodeFieldsLevyValidation.validate(bankSlipData, 10);
      if (
        !this.barCodeMod10Validation.validate(
          barCodeWithoutDv,
          dvBankSlipBarCode,
        )
      ) {
        throw new Error('Invalid Bar code check digit');
      }
    }
    if (coinCode === '8' || coinCode === '9') {
      this.barCodeFieldsLevyValidation.validate(bankSlipData, 11);
      if (
        !this.barCodeMod11Validation.validate(
          barCodeWithoutDv,
          dvBankSlipBarCode,
        )
      ) {
        throw new Error('Invalid Bar code check digit');
      }
    }
    return true;
  }
}
