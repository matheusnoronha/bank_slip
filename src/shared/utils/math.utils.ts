export class MathHelper {
  static roundTen(value: number): number {
    return Math.ceil(value / 10) * 10;
  }
}
