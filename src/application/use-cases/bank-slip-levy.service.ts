import { Injectable } from '@nestjs/common';
import { BankSlipLevyDecodedDto } from '@/presentation/dtos/bank-slip-levy/bank-slip-levy-decoded.dto';
import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';
import { BarCodeLevyValidation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code.validator';
import { BankSlipInterface } from '@/shared/interfaces/bank-slip.interface';

@Injectable()
export class BankSlipLevyService implements BankSlipInterface {
  constructor(private readonly barCodeLevyValidation: BarCodeLevyValidation) {}

  getBankSlipData(bankSlipLineCode: string): BankSlipDecodedDto {
    const decodedData = this.decodedBarCodeLine(bankSlipLineCode);
    const bankSlipBarCode = this.getBarCode(decodedData);
    this.barCodeLevyValidation.validate(decodedData, bankSlipBarCode);
    return new BankSlipDecodedDto(
      bankSlipBarCode,
      decodedData.value,
      decodedData.expireDays,
    );
  }

  private getBarCode(bankSlipData: BankSlipLevyDecodedDto): string {
    const { field1, field2, field3, field4 } = bankSlipData;
    return field1 + field2 + field3 + field4;
  }

  private decodedBarCodeLine(bankSlipCode: string): BankSlipLevyDecodedDto {
    const segmentationId = bankSlipCode[1];
    const field1 = bankSlipCode.slice(0, 11);
    const field2 = bankSlipCode.slice(12, 23);
    const field3 = bankSlipCode.slice(24, 35);
    const field4 = bankSlipCode.slice(36, 47);
    const barCode = field1 + field2 + field3 + field4;

    const freeField =
      segmentationId === '6' ? barCode.slice(23) : barCode.slice(19);
    const expireDays = freeField.slice(0, 9);

    return new BankSlipLevyDecodedDto({
      field1: bankSlipCode.slice(0, 11),
      field2: bankSlipCode.slice(12, 23),
      field3: bankSlipCode.slice(24, 35),
      field4: bankSlipCode.slice(36, 47),
      dvBankSlipField1: bankSlipCode[11],
      dvBankSlipField2: bankSlipCode[23],
      dvBankSlipField3: bankSlipCode[35],
      dvBankSlipField4: bankSlipCode[47],
      dvBankSlipBarCode: bankSlipCode[3],
      segmentationId,
      productId: barCode[0],
      coinCode: barCode[2],
      freeField,
      expireDays,
      value: barCode.slice(4, 15),
    });
  }
}
