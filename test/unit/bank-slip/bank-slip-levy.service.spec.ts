import { Test, TestingModule } from '@nestjs/testing';
import { ValidationProviderMock } from 'test/__mocks__/validation/validation.provider.mock';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { BankSlipLevyMockDto } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.dto.mock';
import { ValidationModule } from '@/infrastructure/ioc/validator.module';
import { BarCodeLevyValidation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code.validator';
import { BankSlipLevyService } from '@/application/use-cases/bank-slip-levy.service';

describe('Bank slip levy tests', () => {
  let barCodeLevyValidation: BarCodeLevyValidation;
  let bankSlipLevyService: BankSlipLevyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ValidationModule],
      providers: [
        BankSlipLevyService,
        {
          provide: BarCodeLevyValidation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
      ],
    }).compile();

    barCodeLevyValidation = module.get<BarCodeLevyValidation>(
      BarCodeLevyValidation,
    );
    bankSlipLevyService = module.get<BankSlipLevyService>(BankSlipLevyService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(bankSlipLevyService).toBeDefined();
  });

  describe('getBankSlipData', () => {
    it('Should return am error if bank slip levy line code is invalid', () => {
      const lineCode = BankSlipTitleMockDto.mockInvalidBankSlipTitleLineCode();
      try {
        jest
          .spyOn(barCodeLevyValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Invalid Bar code check digit');
          });
        bankSlipLevyService.getBankSlipData(lineCode);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid Bar code check digit'));
      }
    });

    it('Should get bank slip data of bank slip', () => {
      const lineCode = BankSlipLevyMockDto.mockValidBankSlipLevyLineCode();
      const mockResponse =
        BankSlipLevyMockDto.mockValidBankSlipLevyDecodedResponseDto();

      const result = bankSlipLevyService.getBankSlipData(lineCode);
      expect(result).toEqual(mockResponse);
    });
  });
});
