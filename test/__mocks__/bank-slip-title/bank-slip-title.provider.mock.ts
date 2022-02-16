export class BankSlipTitleProviderMock {
  static mockBankSlipTitleService(): any {
    return {
      getBankSlipData: jest.fn(),
      getBarCode: jest.fn(),
      decodedBarCodeLine: jest.fn(),
    };
  }
}
