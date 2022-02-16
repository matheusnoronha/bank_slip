import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipMockDto } from 'test/__mocks__/bank-slip/bank-slip.dto.mock';
import { BankSlipLevyMockDto } from 'test/__mocks__/bank-slip-levy/bank-slip-levy.dto.mock';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { LineCodeValidation } from '@/shared/validators/bank-slip-validator/bank-slip.validator';

describe('Validator tests', () => {
  let lineCodeValidation: LineCodeValidation;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [LineCodeValidation],
    }).compile();

    lineCodeValidation = module.get<LineCodeValidation>(LineCodeValidation);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(lineCodeValidation).toBeDefined();
  });

  describe('validate', () => {
    it('Should check if a valid line code', () => {
      const lineCode = BankSlipTitleMockDto.mockValidBankSlipTitleLineCode();
      const result = lineCodeValidation.validate(lineCode);
      expect(result).not.toEqual(new Error());
    });

    it('Should get invalid line code size error', () => {
      const lineCode = BankSlipMockDto.mockInvalidSizeBankSlipLineCode();
      expect(() => {
        lineCodeValidation.validate(lineCode);
      }).toThrow(Error);
      expect(() => {
        lineCodeValidation.validate(lineCode);
      }).toThrow('Invalid code size');
    });

    it('Should get invalid code type', () => {
      const lineCode = BankSlipMockDto.mockInvalidBankSlipLineCode();
      expect(() => {
        lineCodeValidation.validate(lineCode);
      }).toThrow(Error);

      expect(() => {
        lineCodeValidation.validate(lineCode);
      }).toThrow('Code is not a number');
    });

    it('Should get invalid levy line code size', () => {
      const lineCode =
        BankSlipLevyMockDto.mockInvalidSizeBankSlipLevyLineCode();
      expect(() => {
        lineCodeValidation.validate(lineCode);
      }).toThrow(Error);

      expect(() => {
        lineCodeValidation.validate(lineCode);
      }).toThrow('Invalid code size');
    });
  });
});
