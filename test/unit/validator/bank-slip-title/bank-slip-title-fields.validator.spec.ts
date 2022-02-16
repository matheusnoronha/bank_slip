import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { BarCodeFieldsTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code-fields.validator';

describe('Title bar code fields validator tests', () => {

  let barCodeFieldsTitleValidation: BarCodeFieldsTitleValidation;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BarCodeFieldsTitleValidation
      ],
    }).compile();

    barCodeFieldsTitleValidation = module.get<BarCodeFieldsTitleValidation>(
      BarCodeFieldsTitleValidation,
    );

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(barCodeFieldsTitleValidation).toBeDefined();
  });

  describe('validate', () => {
    it('Should check if a barcode fields are valid', () => {
      const decodedBarCode =
        BankSlipTitleMockDto.mockValidBankSlipTitleDecodedDto();
      const { fields, dvFields } = BankSlipTitleMockDto.mockFieldsAndDvFields(decodedBarCode);
      
      const result = barCodeFieldsTitleValidation.validate(fields, dvFields);

      expect(result).not.toEqual(new Error());
    });

    it('should get invalid field error', () => {
      const decodedBarCode =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleDecodedDto({
          dvBankSlipField1: '2'
        });
      const { fields, dvFields } = BankSlipTitleMockDto.mockFieldsAndDvFields(decodedBarCode);
      
      expect(() => {barCodeFieldsTitleValidation.validate(fields, dvFields)}).toThrow(Error)
    });
  });
});
