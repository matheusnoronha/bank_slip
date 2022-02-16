import { Expose } from 'class-transformer';
import { BankSlipLevyInterface } from '@/shared/interfaces/bank-slip-levy.interface';

export class BankSlipLevyDecodedDto {
  @Expose()
  segmentationId: string;

  @Expose()
  productId: string;

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
  dvBankSlipField4: string;

  @Expose()
  field1: string;

  @Expose()
  field2: string;

  @Expose()
  field3: string;

  @Expose()
  field4: string;

  constructor(param: BankSlipLevyInterface) {
    Object.assign(this, param);
  }
}
