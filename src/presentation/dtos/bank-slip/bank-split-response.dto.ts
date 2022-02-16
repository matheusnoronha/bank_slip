import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BankSlipResponseDto {
  @Expose()
  @ApiProperty({
    type: String,
    description: 'bank slip bar code',
    required: true,
    example: '21299758700000020000001121100012100447561740',
  })
  barCode: string;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'bank slip amount',
    required: true,
    example: '20.00',
  })
  amount: string | null;

  @Expose()
  @ApiProperty({
    type: String,
    description: 'bank slip expiration date',
    required: true,
    example: '2018-07-16',
  })
  expirationDate: string | null;

  constructor(
    barCode: string,
    amount: string | null,
    expirationDate: string | null,
  ) {
    this.barCode = barCode;
    this.amount = amount;
    this.expirationDate = expirationDate;
  }
}
