import { Injectable } from '@nestjs/common';
import { BankSlipTitleService } from './bank-slip-title.service';
import { BankSlipResponseDto } from '@/presentation/dtos/bank-slip/bank-split-response.dto';
import { DateAdapter } from '@/infrastructure/adapter/date.adapter';
import { BankSlipLevyService } from './bank-slip-levy.service';
import { BankSlipDecodedDto } from '@/presentation/dtos/bank-slip/bank-slip-validate.dto';
import { MoneyHelper } from '@/shared/utils/money.utils';
import { LineCodeValidation } from '@/shared/validators/bank-slip-validator/bank-slip.validator';

@Injectable()
export class BankSlipService {
  constructor(
    private readonly bankSlipTitle: BankSlipTitleService,
    private readonly bankSlipLevyService: BankSlipLevyService,
    private readonly lineCodeValidation: LineCodeValidation,
  ) {}

  getBankSlipData(bankSlipLineCode: string): BankSlipResponseDto {
    this.lineCodeValidation.validate(bankSlipLineCode);

    const [firstDigit] = bankSlipLineCode;

    let bankSlipResult: BankSlipDecodedDto;
    let expirationDate: string | null;

    if (firstDigit === '8') {
      bankSlipResult =
        this.bankSlipLevyService.getBankSlipData(bankSlipLineCode);
      expirationDate = DateAdapter.bankSlipPaymentDate(
        bankSlipResult.expirationDate,
      );
    } else {
      bankSlipResult = this.bankSlipTitle.getBankSlipData(bankSlipLineCode);
      expirationDate = DateAdapter.addDaysOfBankSlipInitialDate(
        Number(bankSlipResult.expirationDate),
      );
    }

    const amount = MoneyHelper.formatMoney(bankSlipResult.amount);

    return new BankSlipResponseDto(
      bankSlipResult.barCode,
      amount,
      expirationDate,
    );
  }
}
