import { Module } from '@nestjs/common';
import { BankSlipLevyService } from '@/application/use-cases/bank-slip-levy.service';
import { BankSlipService } from '../../application/use-cases/bank-slip.service';
import { BankSlipController } from '../../presentation/controllers/bank-slip.controller';
import { LineCodeValidation } from '@/shared/validators/bank-slip-validator/bank-slip.validator';
import { BankSlipTitleService } from '@/application/use-cases/bank-slip-title.service';
import { ValidationModule } from './validator.module';
// import { BankSlipTitleModule } from './bank-slip-title.module';

@Module({
  imports: [
    // BankSlipTitleModule,
    ValidationModule,
  ],
  controllers: [BankSlipController],
  providers: [
    BankSlipService,
    BankSlipTitleService,
    BankSlipLevyService,
    LineCodeValidation,
  ],
  exports: [BankSlipService, BankSlipLevyService, BankSlipTitleService],
})
export class BankSlipModule {}
