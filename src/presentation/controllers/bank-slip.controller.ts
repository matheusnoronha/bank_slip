import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { BankSlipService } from '@/application/use-cases/bank-slip.service';
import { BankSlipResponseDto } from '../dtos/bank-slip/bank-split-response.dto';

@ApiTags('bank-slip')
@Controller('boleto')
export class BankSlipController {
  constructor(private readonly bankSlipService: BankSlipService) {}

  @ApiResponse({
    description: 'Return BankSlips informations',
    type: BankSlipResponseDto,
    status: HttpStatus.OK,
  })
  @ApiOperation({
    summary: 'check if a bank slip code is valid',
  })
  @Get('/:param')
  async getAll(
    @Param('param') param: string,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const result = this.bankSlipService.getBankSlipData(param);

      return response.status(HttpStatus.OK).json(result);
    } catch (e) {
      return response.status(HttpStatus.BAD_REQUEST).json({ error: e.message });
    }
  }
}
