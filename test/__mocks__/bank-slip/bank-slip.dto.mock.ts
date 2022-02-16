import * as faker from 'faker';
import { BankSlipResponseDto } from '@/presentation/dtos/bank-slip/bank-split-response.dto';
import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';

export class BankSlipMockDto {
  static mockBankSlipResponseDto(
    partial?: Partial<BankSlipResponseDto>,
  ): BankSlipResponseDto {
    return new BankSlipResponseDto(
      partial?.barCode ?? faker.datatype.string(),
      partial?.amount ?? null,
      partial?.expirationDate ?? null,
    );
  }

  static mockValidBankSlipTitleResponseDto(): BankSlipResponseDto {
    return this.mockBankSlipResponseDto({
      barCode: '21299758700000020000001121100012100447561740',
      amount: '20.00',
      expirationDate: '2018-07-16',
    });
  }

  static mockValidBankSlipLevyResponseDto(): BankSlipResponseDto {
    return this.mockBankSlipResponseDto({
      barCode: '85890000460524601791606075930508683148300001',
      amount: '46052.46',
      expirationDate: null,
    });
  }

  static mockInvalidBankSlipLineCode(): string {
    return faker.random.alpha();
  }

  static mockBankSlipDecodedDto(
    partial?: Partial<BankSlipDecodedDto>,
  ): BankSlipDecodedDto {
    return new BankSlipDecodedDto(
      partial?.barCode ?? faker.datatype.string(),
      partial?.amount ?? faker.datatype.string(),
      partial?.expirationDate ?? faker.datatype.string(),
    );
  }

  static mockInvalidSizeBankSlipLineCode(): string {
    return '2129000119210001219047517405975870000002000';
  }
}
