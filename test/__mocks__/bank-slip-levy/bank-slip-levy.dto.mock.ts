import * as faker from 'faker';
import { BankSlipLevyDecodedDto } from '@/presentation/dtos/bank-slip-levy/bank-slip-levy-decoded.dto';
import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';
import { BankSlipMockDto } from '../bank-slip/bank-slip.dto.mock';

export class BankSlipLevyMockDto {
  static mockBankSlipLevyDecodedDto(
    partial?: Partial<BankSlipLevyDecodedDto>,
  ): BankSlipLevyDecodedDto {
    return new BankSlipLevyDecodedDto({
      productId: partial?.productId ?? faker.datatype.string(),
      segmentationId: partial?.segmentationId ?? faker.datatype.string(),
      coinCode: partial?.coinCode ?? faker.datatype.string(),
      dvBankSlipBarCode: partial?.dvBankSlipBarCode ?? faker.datatype.string(),
      dvBankSlipField1: partial?.dvBankSlipField1 ?? faker.datatype.string(),
      dvBankSlipField2: partial?.dvBankSlipField2 ?? faker.datatype.string(),
      dvBankSlipField3: partial?.dvBankSlipField3 ?? faker.datatype.string(),
      dvBankSlipField4: partial?.dvBankSlipField4 ?? faker.datatype.string(),
      expireDays: partial?.expireDays ?? faker.datatype.string(),
      field1: partial?.field1 ?? faker.datatype.string(),
      field2: partial?.field2 ?? faker.datatype.string(),
      field3: partial?.field3 ?? faker.datatype.string(),
      field4: partial?.field4 ?? faker.datatype.string(),
      freeField: partial?.freeField ?? faker.datatype.string(),
      value: partial?.value ?? faker.datatype.string(),
    });
  }

  static mockValidBankSlipLevyDecodedDto(): BankSlipLevyDecodedDto {
    return new BankSlipLevyDecodedDto({
      field1: '85890000460',
      field2: '52460179160',
      field3: '60759305086',
      field4: '83148300001',
      dvBankSlipField1: '9',
      dvBankSlipField2: '5',
      dvBankSlipField3: '5',
      dvBankSlipField4: '0',
      dvBankSlipBarCode: '9',
      segmentationId: '5',
      productId: '8',
      coinCode: '8',
      freeField: '1606075930508683148300001',
      expireDays: '160607593',
      value: '00004605246'
    });
  }

  static mockValidBankSlipLevyDecodedCoinCode6Dto(): BankSlipLevyDecodedDto {
    return new BankSlipLevyDecodedDto({
      field1: '83620000000',
      field2: '66780048100',
      field3: '18097565731',
      field4: '00158963608',
      dvBankSlipField1: '5',
      dvBankSlipField2: '0',
      dvBankSlipField3: '3',
      dvBankSlipField4: '1',
      dvBankSlipBarCode: '2',
      segmentationId: '3',
      productId: '8',
      coinCode: '6',
      freeField: '1001809756573100158963608',
      expireDays: '100180975',
      value: '00000006678'
    });
  }
  
  static mockValidBankSlipLevyLineCode(): string {
    return '858900004609524601791605607593050865831483000010';
  }
  

  static mockValidBankSlipLevyLineCodeCoinCode6(): string {
    return '836200000005667800481000180975657313001589636081';
  }

  static mockValidBankSlipLevyBarCodeWithoutDv(): string {
    const barCode = this.mockValidBankSlipLevyBarCode()

    return barCode.slice(0, 3) + barCode.slice(4);
  }

  static mockValidBankSlipLevyBarCodeWithoutDvAndCoinCode6(): string {
    const barCode = this.mockValidBankSlipLevyBarCodeCoinCode6()
    
    return barCode.slice(0, 3) + barCode.slice(4);
  }

  static mockValidBankSlipLevyBarCodeCoinCode6(): string {
    return '83620000000667800481001809756573100158963608';
  }

  static mockValidBankSlipLevyBarCode(): string {
    return '85890000460524601791606075930508683148300001';
  }

  static mockInvalidBankSlipLevyBarCode(): string {
    return '85890000460524601791606075930508683428300001';
  }

  static mockInvalidBankSlipLevyLineCode(): string {
    return '858900004609524601791605607593050865831485600010';
  }

  static mockInvalidSizeBankSlipLevyLineCode(): string {
    return '85890000460952460179160560759305086583148560001014233';
  }

  static mockValidBankSlipLevyDecodedResponseDto(): BankSlipDecodedDto {
    return BankSlipMockDto.mockBankSlipDecodedDto({
      barCode: '85890000460524601791606075930508683148300001',
      amount: '00004605246',
      expirationDate: '160607593',
    });
  }
}
