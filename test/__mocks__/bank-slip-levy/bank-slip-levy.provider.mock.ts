export class BankSlipLevyProviderMock {
  static mockBankSlipLevyService(): any {
    return {
      getBankSlipData: jest.fn(),
      getBarCode: jest.fn(),
      decodedBarCodeLine: jest.fn(),
    };
  }
}
