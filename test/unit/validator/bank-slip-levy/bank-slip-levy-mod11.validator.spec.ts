import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipLevyMockDto } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.dto.mock';
import { BarCodeMod11Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod11.validator';

describe('Bank slip levy mod 11 validator tests', () => {
  let barCodeMod11Validation: BarCodeMod11Validation;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BarCodeMod11Validation
      ],
    }).compile();
    barCodeMod11Validation = module.get<BarCodeMod11Validation>(BarCodeMod11Validation);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(barCodeMod11Validation).toBeDefined();
  });

  describe('validate', () => {
    it('Should be a valid bar code mod 11', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeWithoutDv();

      const {dvBankSlipBarCode} =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedDto();

      const result = barCodeMod11Validation.validate(barCode, dvBankSlipBarCode);
      expect(result).toBeTruthy()
    });

    it('Should be a invalid bar code mod 11', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeWithoutDvAndCoinCode6();

      const {dvBankSlipBarCode} =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedCoinCode6Dto();

      const result = barCodeMod11Validation.validate(barCode, dvBankSlipBarCode);

      expect(result).toBeFalsy()
    });



  });
});
    // it('Should check if a valid bar code with coin code 6 | 7', () => {
    //   const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeCoinCode6();
    //   const decodedBarCode =
    //   BankSlipLevyMockDto.mockValidBankSlipLevyDecodedCoinCode6Dto();
    //   jest.spyOn(barCodeFieldsLevyValidation, 'validate').mockImplementationOnce(() => true)
    //   jest.spyOn(barCodeMod10Validation, 'validate').mockImplementationOnce(() => true)

    //   const result = barCodeLevyValidation.validate(decodedBarCode, barCode);
    //   expect(result).not.toEqual(new Error());
    // });

    // it('Should get an invalid dv error 6 | 7', () => {
    //   const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeCoinCode6();
    //   const decodedBarCode =
    //   BankSlipLevyMockDto.mockValidBankSlipLevyDecodedCoinCode6Dto();
    //   jest.spyOn(barCodeFieldsLevyValidation, 'validate').mockImplementationOnce(() => true)

    //   jest.spyOn(barCodeMod10Validation, 'validate').mockImplementationOnce(() => false)

    //   expect(() => {
    //     barCodeLevyValidation.validate(decodedBarCode, barCode)}).toThrowError('Invalid Bar code check digit')
    // });

    // it('Should check if a valid bar code with coin code 8 | 9', () => {
    //   const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCode();
    //   const decodedBarCode =
    //   BankSlipLevyMockDto.mockValidBankSlipLevyDecodedDto();
    //   jest.spyOn(barCodeFieldsLevyValidation, 'validate').mockImplementationOnce(() => true)
    //   jest.spyOn(barCodeMod11Validation, 'validate').mockImplementationOnce(() => false)

    //   expect(() => {
    //     barCodeLevyValidation.validate(decodedBarCode, barCode)}).toThrowError('Invalid Bar code check digit')
    // });

