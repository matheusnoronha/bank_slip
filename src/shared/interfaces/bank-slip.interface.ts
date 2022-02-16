import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';

export interface BankSlipInterface {
  getBankSlipData: (bankSlipLineCode: string) => BankSlipDecodedDto;
}
