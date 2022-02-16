import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BankSlipModule } from './infrastructure/ioc/bank-slip.module';

@Module({
  imports: [
    BankSlipModule,
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
