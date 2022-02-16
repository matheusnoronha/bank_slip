import { Expose } from 'class-transformer';
import { BankSlipTitleInterface } from '@/shared/interfaces/bank-slip-title.interface';

export class BankSlipTitleDecodedDto {
  @Expose()
  codeFI: string;

  @Expose()
  coinCode: string;

  @Expose()
  freeField: string;

  @Expose()
  expireDays: string;

  @Expose()
  value: string;

  @Expose()
  dvBankSlipBarCode: string;

  @Expose()
  dvBankSlipField1: string;

  @Expose()
  dvBankSlipField2: string;

  @Expose()
  dvBankSlipField3: string;

  @Expose()
  field1: string;

  @Expose()
  field2: string;

  @Expose()
  field3: string;

  constructor(param: BankSlipTitleInterface) {
    Object.assign(this, param);
  }
}
