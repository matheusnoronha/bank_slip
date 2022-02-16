import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BankSlipDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'bank slip code',
    required: true,
    example: '21290001192110001210904475617405975870000002000',
  })
  bankSlipCode: string;

  constructor(bankSlipCode: string) {
    this.bankSlipCode = bankSlipCode;
  }
}
