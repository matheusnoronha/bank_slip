import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipLevyMockDto } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.dto.mock';
import { BarCodeMod11Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod11.validator';
import { BarCodeMod10Validation } from '@/shared/validators/bank-slip-validator/bank-slip-levy-validator/bar-code-mod10.validator';

describe('Bank slip levy mod 10 validator tests', () => {
  let barCodeMod10Validation: BarCodeMod10Validation;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BarCodeMod10Validation
      ],
    }).compile();
    barCodeMod10Validation = module.get<BarCodeMod10Validation>(BarCodeMod10Validation);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(barCodeMod10Validation).toBeDefined();
  });

  describe('validate', () => {
    it('Should be a valid bar code mod 10', () => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeWithoutDvAndCoinCode6();

      const {dvBankSlipBarCode} =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedCoinCode6Dto();

      const result = barCodeMod10Validation.validate(barCode, dvBankSlipBarCode);

      expect(result).toBeTruthy()
    });

    it('Should be a invalid bar code mod 10',() => {
      const barCode = BankSlipLevyMockDto.mockValidBankSlipLevyBarCodeWithoutDv();

      const {dvBankSlipBarCode} =
      BankSlipLevyMockDto.mockValidBankSlipLevyDecodedDto();

      const result = barCodeMod10Validation.validate(barCode, dvBankSlipBarCode);
      expect(result).toBeFalsy()
    });
  });
});

