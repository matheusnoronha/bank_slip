export class ValidationProviderMock {
  static mockProviderValidation(): any {
    return {
      validate: jest.fn(),
    };
  }
}
