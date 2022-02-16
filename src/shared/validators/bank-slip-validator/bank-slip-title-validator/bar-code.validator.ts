import { Injectable } from '@nestjs/common';
import { BankSlipTitleDecodedDto } from '@/presentation/dtos/bank-slip-title/bank-slip-title-decoded.dto';
import { BarCodeDVValidation } from './bar-code-dv.validator';
import { BarCodeFieldsTitleValidation } from './bar-code-fields.validator';

@Injectable()
export class BarCodeTitleValidation {
  constructor(
    private readonly barCodeFieldsValidation: BarCodeFieldsTitleValidation,
    private readonly barCodeDVValidation: BarCodeDVValidation,
  ) {}

  validate(data: BankSlipTitleDecodedDto, bankSlipBarCode: string): void {
    const fields = (data.field1 + data.field2 + data.field3).split('');
    const dvFields = (
      data.dvBankSlipField1 +
      data.dvBankSlipField2 +
      data.dvBankSlipField3
    ).split('');

    this.barCodeFieldsValidation.validate(fields, dvFields);
    this.barCodeDVValidation.validate(bankSlipBarCode, data.dvBankSlipBarCode);
  }
}
