import { Test, TestingModule } from '@nestjs/testing';
import { ValidationProviderMock } from 'test/__mocks__/validation/validation.provider.mock';
import { BankSlipLevyMockDto } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.dto.mock';
import { BarCodeLevyValidation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code.validator';
import { BarCodeMod10Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod10.validator';
import { BarCodeMod11Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod11.validator';
import { BarCodeFieldsLevyValidation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-fields.validator';

describe('Bank slip levy validator tests', () => {
  let barCodeLevyValidation: BarCodeLevyValidation;
  let barCodeMod10Validation: BarCodeMod10Validation;
  let barCodeMod11Validation: BarCodeMod11Validation;
  let barCodeFieldsLevyValidation: BarCodeFieldsLevyValidation

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BarCodeLevyValidation,
        {
          provide: BarCodeMod10Validation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
        {
          provide: BarCodeMod11Validation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
        {
          provide: BarCodeFieldsLevyValidation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
      ],
    }).compile();

    barCodeLevyValidation = module.get<BarCodeLevyValidation>(
      BarCodeLevyValidation,
    );
    barCodeFieldsLevyValidation = module.get<BarCodeFieldsLevyValidation>(
      BarCodeFieldsLevyValidation,
    );
    barCodeMod10Validation = module.get<BarCodeMod10Validation>(
      BarCodeMod10Validation,
    );
    barCodeMod11Validation = module.get<BarCodeMod11Validation>(BarCodeMod11Validation);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(barCodeLevyValidation).toBeDefined();
  });

  describe('validate', () => {
    it('Should check if a valid bar code with coin code 8 | 9', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCode();
      const decodedBarCode =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedDto();
      jest.spyOn(barCodeMod11Validation, 'validate').mockImplementationOnce(() => true)

      const result = barCodeLevyValidation.validate(decodedBarCode, barCode);
      expect(result).not.toEqual(new Error());
    });

    it('Should check if a valid bar code with coin code 6 | 7', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeCoinCode6();
      const decodedBarCode =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedCoinCode6Dto();
      jest.spyOn(barCodeFieldsLevyValidation, 'validate').mockImplementationOnce(() => true)
      jest.spyOn(barCodeMod10Validation, 'validate').mockImplementationOnce(() => true)

      const result = barCodeLevyValidation.validate(decodedBarCode, barCode);
      expect(result).not.toEqual(new Error());
    });

    it('Should get an invalid dv error 6 | 7', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeCoinCode6();
      const decodedBarCode =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedCoinCode6Dto();
      jest.spyOn(barCodeFieldsLevyValidation, 'validate').mockImplementationOnce(() => true)

      jest.spyOn(barCodeMod10Validation, 'validate').mockImplementationOnce(() => false)

      expect(() => {
        barCodeLevyValidation.validate(decodedBarCode, barCode)}).toThrowError('Invalid Bar code check digit')
    });

    it('Should check if a valid bar code with coin code 8 | 9', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCode();
      const decodedBarCode =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedDto();
      jest.spyOn(barCodeFieldsLevyValidation, 'validate').mockImplementationOnce(() => true)
      jest.spyOn(barCodeMod11Validation, 'validate').mockImplementationOnce(() => false)

      expect(() => {
        barCodeLevyValidation.validate(decodedBarCode, barCode)}).toThrowError('Invalid Bar code check digit')
    });
  });
});
