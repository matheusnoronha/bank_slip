import { Injectable } from '@nestjs/common';
import { BankSlipTitleDecodedDto } from '@/presentation/dtos/bank-slip-title/bank-slip-title-decoded.dto';
import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';
import { BarCodeTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code.validator';
import { BankSlipInterface } from '@/shared/interfaces/bank-slip.interface';

@Injectable()
export class BankSlipTitleService implements BankSlipInterface {
  constructor(
    private readonly barCodeTitleValidation: BarCodeTitleValidation,
  ) {}

  getBankSlipData(bankSlipLineCode: string): BankSlipDecodedDto {
    const decodedData = this.decodedBarCodeLine(bankSlipLineCode);
    const bankSlipBarCode = this.getBarCode(decodedData);
    this.barCodeTitleValidation.validate(decodedData, bankSlipBarCode);

    return new BankSlipDecodedDto(
      bankSlipBarCode,
      decodedData.value,
      decodedData.expireDays,
    );
  }

  private getBarCode(decodedData: BankSlipTitleDecodedDto): string {
    return (
      decodedData.codeFI +
      decodedData.coinCode +
      decodedData.dvBankSlipBarCode +
      decodedData.expireDays +
      decodedData.value +
      decodedData.freeField
    );
  }

  private decodedBarCodeLine(bankSlipCode: string): BankSlipTitleDecodedDto {
    const code = bankSlipCode;
    const codeFI = code.slice(0, 3);
    const coinCode = code[3];
    const field1 = codeFI + coinCode + code.slice(4, 9);
    const field2 = code.slice(10, 20);
    const field3 = code.slice(21, 31);
    const freeField = code.slice(4, 9) + field2 + field3;

    return new BankSlipTitleDecodedDto({
      field1,
      field2,
      field3,
      dvBankSlipField1: code[9],
      dvBankSlipField2: code[20],
      dvBankSlipField3: code[31],
      dvBankSlipBarCode: code[32],
      codeFI,
      coinCode: code[3],
      freeField,
      expireDays: code.slice(33, 37),
      value: code.slice(37),
    });
  }
}
