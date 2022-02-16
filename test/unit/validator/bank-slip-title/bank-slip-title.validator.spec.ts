import { Test, TestingModule } from '@nestjs/testing';
import { ValidationProviderMock } from 'test/__mocks__/validation/validation.provider.mock';
import { BankSlipTitleMockDto } from 'test/__mocks__/bank-slip-title/bank-slip-title.dto.mock';
import { BarCodeTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code.validator';
import { BarCodeFieldsTitleValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code-fields.validator';
import { BarCodeDVValidation } from '@/shared/validators/bank-slip-validator/bank-slip-title-validator/bar-code-dv.validator';

describe('Bank slip title validator tests', () => {
  let barCodeTitleValidation: BarCodeTitleValidation;
  let barCodeFieldsTitleValidation: BarCodeFieldsTitleValidation;
  let barCodeDVValidation: BarCodeDVValidation;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        BarCodeTitleValidation,
        {
          provide: BarCodeFieldsTitleValidation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
        {
          provide: BarCodeDVValidation,
          useFactory: ValidationProviderMock.mockProviderValidation,
        },
      ],
    }).compile();

    barCodeTitleValidation = module.get<BarCodeTitleValidation>(
      BarCodeTitleValidation,
    );
    barCodeFieldsTitleValidation = module.get<BarCodeFieldsTitleValidation>(
      BarCodeFieldsTitleValidation,
    );
    barCodeDVValidation = module.get<BarCodeDVValidation>(BarCodeDVValidation);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(barCodeTitleValidation).toBeDefined();
  });

  describe('validate', () => {
    it('Should check if a valid bar code', () => {
      const barCode = BankSlipTitleMockDto.mockValidBankSlipTitleBarCode();
      const decodedBarCode =
        BankSlipTitleMockDto.mockValidBankSlipTitleDecodedDto();
      const result = barCodeTitleValidation.validate(decodedBarCode, barCode);
      expect(result).not.toEqual(new Error());
    });

    it('Should get an invalid field 1 error', () => {
      const barCode =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleBarCodeField1();
      const decodedTitle =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleDecodedDto({
          field1: '212230011',
        });

      try {
        jest
          .spyOn(barCodeFieldsTitleValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Field 1 is invalid');
          });
        barCodeTitleValidation.validate(decodedTitle, barCode);
      } catch (error) {
        expect(error).toEqual(new Error('Field 1 is invalid'));
      }
    });

    it('Should get an invalid field 2 error', () => {
      const barCode =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleBarCodeField1();
      const decodedTitle =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleDecodedDto({
          field2: '2111301210',
        });

      try {
        jest
          .spyOn(barCodeFieldsTitleValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Field 2 is invalid');
          });
        barCodeTitleValidation.validate(decodedTitle, barCode);
      } catch (error) {
        expect(error).toEqual(new Error('Field 2 is invalid'));
      }
    });

    it('Should get an invalid field 3 error', () => {
      const barCode =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleBarCodeField1();
      const decodedTitle =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleDecodedDto({
          field3: '0447961740',
        });

      try {
        jest
          .spyOn(barCodeFieldsTitleValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Field 3 is invalid');
          });
        barCodeTitleValidation.validate(decodedTitle, barCode);
      } catch (error) {
        expect(error).toEqual(new Error('Field 3 is invalid'));
      }
    });

    it('Should get an invalid dv error', () => {
      const barCode =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleBarCodeField1();
      const decodedTitle =
        BankSlipTitleMockDto.mockInvalidBankSlipTitleDecodedDto({
          dvBankSlipBarCode: '4',
        });

      try {
        jest
          .spyOn(barCodeDVValidation, 'validate')
          .mockImplementationOnce(() => {
            throw new Error('Invalid Bar code check digit');
          });
        barCodeTitleValidation.validate(decodedTitle, barCode);
      } catch (error) {
        expect(error).toEqual(new Error('Invalid Bar code check digit'));
      }
    });
  });
});
