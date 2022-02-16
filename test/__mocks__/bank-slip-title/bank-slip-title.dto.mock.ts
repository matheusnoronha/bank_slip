import * as faker from 'faker';
import { BankSlipTitleDecodedDto } from '@/presentation/dtos/bank-slip-title/bank-slip-title-decoded.dto';
import { BankSlipMockDto } from '../bank-slip/bank-slip.dto.mock';
import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';

export class BankSlipTitleMockDto {
  static mockBankSlipTitleDecodedDto(
    partial?: Partial<BankSlipTitleDecodedDto>,
  ): BankSlipTitleDecodedDto {
    return new BankSlipTitleDecodedDto({
      codeFI: partial?.codeFI ?? faker.datatype.string(),
      coinCode: partial?.coinCode ?? faker.datatype.string(),
      dvBankSlipBarCode: partial?.dvBankSlipBarCode ?? faker.datatype.string(),
      dvBankSlipField1: partial?.dvBankSlipField1 ?? faker.datatype.string(),
      dvBankSlipField2: partial?.dvBankSlipField2 ?? faker.datatype.string(),
      dvBankSlipField3: partial?.dvBankSlipField3 ?? faker.datatype.string(),
      expireDays: partial?.expireDays ?? faker.datatype.string(),
      field1: partial?.field1 ?? faker.datatype.string(),
      field2: partial?.field2 ?? faker.datatype.string(),
      field3: partial?.field3 ?? faker.datatype.string(),
      freeField: partial?.freeField ?? faker.datatype.string(),
      value: partial?.value ?? faker.datatype.string(),
    });
  }

  static mockInvalidBankSlipTitleDecodedDto(
    partial?: Partial<BankSlipTitleDecodedDto>,
  ): BankSlipTitleDecodedDto {
    return new BankSlipTitleDecodedDto({
      field1: partial?.field1 ?? '212900011',
      field2: partial?.field2 ?? '2110001210',
      field3: partial?.field3 ?? '0447561740',
      dvBankSlipField1: partial?.dvBankSlipField1 ?? '9',
      dvBankSlipField2: partial?.dvBankSlipField2 ?? '9',
      dvBankSlipField3: partial?.dvBankSlipField3 ?? '5',
      dvBankSlipBarCode: partial?.dvBankSlipBarCode ?? '9',
      codeFI: '212',
      coinCode: '9',
      freeField: '0001121100012100447561740',
      expireDays: '7587',
      value: '0000002000',
    });
  }

  static mockFieldsAndDvFields(data: BankSlipTitleDecodedDto ): { fields: string[], dvFields: string[]} {
    const fields = (data.field1 + data.field2 + data.field3).split('');
    const dvFields = (
      data.dvBankSlipField1 +
      data.dvBankSlipField2 +
      data.dvBankSlipField3
    ).split('');

    return { fields, dvFields }
  }

  static mockValidBankSlipTitleDecodedDto(): BankSlipTitleDecodedDto {
    return new BankSlipTitleDecodedDto({
      field1: '212900011',
      field2: '2110001210',
      field3: '0447561740',
      dvBankSlipField1: '9',
      dvBankSlipField2: '9',
      dvBankSlipField3: '5',
      dvBankSlipBarCode: '9',
      codeFI: '212',
      coinCode: '9',
      freeField: '0001121100012100447561740',
      expireDays: '7587',
      value: '0000002000',
    });
  }

  static mockValidBankSlipTitleLineCode(): string {
    return '21290001192110001210904475617405975870000002000';
  }

  static mockValidBankSlipTitleBarCode(): string {
    return '21299758700000020000001121100012100447561740';
  }

  static mockInvalidBankSlipTitleBarCodeField1(): string {
    return '21299758700000020003001121100012100447561740';
  }

  static mockInvalidBankSlipTitleBarCodeField2(): string {
    return '21299758700000020000001121100412100447561740';
  }

  static mockInvalidBankSlipTitleBarCodeField3(): string {
    return '21299758700000020000001121100012100447761740';
  }

  static mockInvalidBankSlipTitleBarCodeDV(): string {
    return '21299758700001020000001121100012100447561740';
  }

  static mockInvalidBankSlipTitleLineCode(): string {
    return '21290001192110001210904475617405975820000002000';
  }

  static mockValidBankSlipTitleDecodedResponseDto(): BankSlipDecodedDto {
    return BankSlipMockDto.mockBankSlipDecodedDto({
      barCode: '21299758700000020000001121100012100447561740',
      amount: '0000002000',
      expirationDate: '7587',
    });
  }
}
