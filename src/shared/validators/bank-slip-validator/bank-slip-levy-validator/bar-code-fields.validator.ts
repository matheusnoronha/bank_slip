import { Injectable } from '@nestjs/common';
import { BankSlipLevyDecodedDto } from '@/presentation/dtos/bank-slip-levy/bank-slip-levy-decoded.dto';
import { BarCodeMod10Validation } from './bar-code-mod10.validator';
import { BarCodeMod11Validation } from './bar-code-mod11.validator';

@Injectable()
export class BarCodeFieldsLevyValidation {
  constructor(
    private readonly barCodeMod10Validation: BarCodeMod10Validation,
    private readonly barCodeMod11Validation: BarCodeMod11Validation,
  ) {}

  validate(bankSlipData: BankSlipLevyDecodedDto, modValue: number): boolean {
    const { field1, field2, field3, field4 } = bankSlipData;
    const {
      dvBankSlipField1,
      dvBankSlipField2,
      dvBankSlipField3,
      dvBankSlipField4,
    } = bankSlipData;
    const mod =
      modValue === 11
        ? this.barCodeMod11Validation.validate
        : this.barCodeMod10Validation.validate;

    if (!mod(field1, dvBankSlipField1)) {
      throw new Error(`Field 1 is invalid`);
    }
    if (!mod(field2, dvBankSlipField2)) {
      throw new Error(`Field 2 is invalid`);
    }
    if (!mod(field3, dvBankSlipField3)) {
      throw new Error(`Field 3 is invalid`);
    }
    if (!mod(field4, dvBankSlipField4)) {
      throw new Error(`Field 4 is invalid`);
    }
    return true;
  }
}
