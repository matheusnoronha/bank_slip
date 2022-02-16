import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipTitleProviderMock } from 'test/__mocks__/bank-slip-title/bank-slip-title.provider.mock';
import { BankSlipMockDto } from 'test/__mocks__/bank-slip/bank-slip.dto.mock';
import { ValidationProviderMock } from 'test/__mocks__/validation/validation.provider.mock';
import { BankSlipLevyProviderMock } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.provider.mock';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { BankSlipLevyMockDto } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.dto.mock';
import { BankSlipService } from '@/application/use-cases/bank-slip.service';
import { BankSlipTitleService } from '@/application/use-cases/bank-slip-title.service';
import { BankSlipLevyService } from '@/application/use-cases/bank-slip-levy.service';
import { LineCodeValidation } from '@/shared/validators/bank-slip-validator/bank-slip.validator';
import { ValidationModule } from '@/infrastructure/ioc/validator.module';

describe('Bank slip service tests', () => {
  let bankSlipService: BankSlipService;
  let lineCodeValidation: LineCodeValidation;
  let bankSlipTitleService: BankSlipTitleService;
  let bankSlipLevyService: BankSlipLevyService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ValidationModule],
      providers: [
        BankSlipService,
        {
          provide: LineCodeValidation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
        {
          provide: BankSlipTitleService,
          useFactory: BankSlipTitleProviderMock.mockBankSlipTitleService,
        },
        {
          provide: BankSlipLevyService,
          useFactory: BankSlipLevyProviderMock.mockBankSlipLevyService,
        },
      ],
    }).compile();

    bankSlipService = module.get<BankSlipService>(BankSlipService);
    lineCodeValidation = module.get<LineCodeValidation>(LineCodeValidation);
    bankSlipTitleService =
      module.get<BankSlipTitleService>(BankSlipTitleService);
    bankSlipLevyService = module.get<BankSlipLevyService>(BankSlipLevyService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(bankSlipService).toBeDefined();
  });

  describe('getBankSlipData', () => {
    it('Should return am error if bank slip line code is invalid', () => {
      const lineCode = BankSlipMockDto.mockInvalidBankSlipLineCode();
      try {
        jest
          .spyOn(lineCodeValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Invalid code size');
          });
        bankSlipService.getBankSlipData(lineCode);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid code size'));
      }
    });

    it('Should return am error if bank slip title line code is invalid', () => {
      const lineCode = BankSlipTitleMockDto.mockInvalidBankSlipTitleLineCode();

      try {
        jest
          .spyOn(bankSlipTitleService, 'getBankSlipData')
          .mockImplementationOnce(() => {
            throw new Error('Invalid Bar code check digit');
          });
        bankSlipService.getBankSlipData(lineCode);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid Bar code check digit'));
      }
    });

    it('Should return am error if bank slip levy line code is invalid', () => {
      const lineCode = BankSlipLevyMockDto.mockInvalidBankSlipLevyLineCode();

      try {
        jest
          .spyOn(bankSlipLevyService, 'getBankSlipData')
          .mockImplementationOnce(() => {
            throw new Error('Invalid Bar code check digit');
          });
        bankSlipService.getBankSlipData(lineCode);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid Bar code check digit'));
      }
    });

    it('Should get bank slip data of bank slip title', () => {
      const lineCode = BankSlipTitleMockDto.mockValidBankSlipTitleLineCode();
      const mockResponse = BankSlipMockDto.mockValidBankSlipTitleResponseDto();
      const bankSlipDecodedMock =
        BankSlipTitleMockDto.mockValidBankSlipTitleDecodedResponseDto();

      jest
        .spyOn(bankSlipTitleService, 'getBankSlipData')
        .mockImplementationOnce(() => bankSlipDecodedMock);

      const result = bankSlipService.getBankSlipData(lineCode);
      expect(mockResponse).toEqual(result);
    });

    it('Should get bank slip data of bank slip levy', () => {
      const lineCode = BankSlipLevyMockDto.mockValidBankSlipLevyLineCode();
      const mockResponse = BankSlipMockDto.mockValidBankSlipLevyResponseDto();
      const bankSlipDecodedMock =
        BankSlipLevyMockDto.mockValidBankSlipLevyDecodedResponseDto();
      jest
        .spyOn(bankSlipLevyService, 'getBankSlipData')
        .mockImplementationOnce(() => bankSlipDecodedMock);

      const result = bankSlipService.getBankSlipData(lineCode);
      expect(result).toEqual(mockResponse);
    });
  });
});
