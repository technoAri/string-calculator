export class NumberInput {
  delimiter: RegExp;
  numbers: string;

  constructor(delimiter: RegExp, numbers: string) {
      this.delimiter = delimiter;
      this.numbers = numbers;
  }
}
