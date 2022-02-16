import { Test, TestingModule } from '@nestjs/testing';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { BarCodeDVValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code-dv.validator';

describe('Title bar code dv validator tests', () => {

  let barCodeDVValidation: BarCodeDVValidation;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BarCodeDVValidation
      ],
    }).compile();

    barCodeDVValidation = module.get<BarCodeDVValidation>(
      BarCodeDVValidation,
    );

  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(barCodeDVValidation).toBeDefined();
  });

  describe('validate', () => {
    it('Should check if a barcode fields are valid', () => {
      const { dvBankSlipBarCode } =
        BankSlipTitleMockDto.mockValidBankSlipTitleDecodedDto();
      const barcode = BankSlipTitleMockDto.mockValidBankSlipTitleBarCode()
      
      const result = barCodeDVValidation.validate(barcode, dvBankSlipBarCode);

      expect(result).not.toEqual(new Error());
    });

    it('should get invalid field error', () => {
      const { dvBankSlipBarCode } =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleDecodedDto({
          dvBankSlipField1: '2'
        });
        const barcode = BankSlipTitleMockDto.mockInvalidBankSlipTitleBarCodeDV()
      
      expect(() => { barCodeDVValidation.validate(barcode, dvBankSlipBarCode)}).toThrow(Error)
      expect(() => { barCodeDVValidation.validate(barcode, dvBankSlipBarCode)}).toThrow('Invalid Bar code check digit')

    });
  });
});
