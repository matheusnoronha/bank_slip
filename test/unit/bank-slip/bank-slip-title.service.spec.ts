import { Test, TestingModule } from '@nestjs/testing';
import { ValidationProviderMock } from 'test/__mocks__/validation/validation.provider.mock';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { BankSlipTitleService } from '@/application/use-cases/bank-slip-title.service';
import { ValidationModule } from '@/infrastructure/ioc/validator.module';
import { BarCodeTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code.validator';

describe('Bank slip title tests', () => {
  let barCodeTitleValidation: BarCodeTitleValidation;
  let bankSlipTitleService: BankSlipTitleService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ValidationModule],
      providers: [
        BankSlipTitleService,
        {
          provide: BarCodeTitleValidation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
      ],
    }).compile();

    barCodeTitleValidation = module.get<BarCodeTitleValidation>(
      BarCodeTitleValidation,
    );
    bankSlipTitleService =
      module.get<BankSlipTitleService>(BankSlipTitleService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(bankSlipTitleService).toBeDefined();
  });

  describe('getBankSlipData', () => {
    it('Should return am error if bank slip title line code is invalid', () => {
      const lineCode = BankSlipTitleMockDto.mockInvalidBankSlipTitleLineCode();
      try {
        jest
          .spyOn(barCodeTitleValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Invalid Bar code check digit');
          });
        bankSlipTitleService.getBankSlipData(lineCode);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid Bar code check digit'));
      }
    });

    it('Should get bank slip data of bank slip', () => {
      const lineCode = BankSlipTitleMockDto.mockValidBankSlipTitleLineCode();
      const mockResponse =
        BankSlipTitleMockDto.mockValidBankSlipTitleDecodedResponseDto();

      const result = bankSlipTitleService.getBankSlipData(lineCode);
      expect(result).toEqual(mockResponse);
    });
  });
});
