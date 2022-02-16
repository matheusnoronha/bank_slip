import { Module } from '@nestjs/common';
import { BankSlipLevyService } from '@/application/use-cases/bank-slip-levy.service';
import { BankSlipTitleService } from '../../application/use-cases/bank-slip-title.service';
import { BarCodeTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code.validator';
import { BarCodeFieldsLevyValidation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-fields.validator';
import { BarCodeLevyValidation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code.validator';
import { BarCodeFieldsTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code-fields.validator';
import { BarCodeDVValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code-dv.validator';
import { BarCodeMod10Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod10.validator';
import { BarCodeMod11Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod11.validator';

@Module({
  imports: [],
  controllers: [],
  providers: [
    BarCodeLevyValidation,
    BarCodeTitleValidation,
    BarCodeFieldsLevyValidation,
    BarCodeFieldsTitleValidation,
    BarCodeDVValidation,
    BarCodeMod10Validation,
    BarCodeMod11Validation,
  ],
  exports: [BarCodeTitleValidation, BarCodeLevyValidation],
})
export class ValidationModule {}
