import { NumberInput } from './../models/number-input.models';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor() { }

  add(numbers: string): number {
    let components = this.getComponents(numbers);
    let delimiter = components.delimiter;
    numbers = components.numbers;

    let values = numbers.split(delimiter);
    let sum = 0;
    let invalidValues = [];
    for (let value of values) {
        let numberValue = parseInt(value);
        if (numberValue < 0) {
            invalidValues.push(numberValue);
        } else {
            sum += numberValue > 1000 ? 0 : numberValue;
        }
    }

    if (invalidValues.length) {
        throw new Error('No negative values are allowed: ' + invalidValues.join(', '));
    }

    return sum || 0;
}

getComponents(input: string): NumberInput {
    let delimiter = /,|\n/;
    let numbers = input;
    if (input.startsWith('//')) {
        delimiter = new RegExp(this.escapeRegExp(input.split('\n').shift().substr(2)));
        numbers = input.replace(/^\/\/.+\n/, '');
    }

    return new NumberInput(delimiter, numbers);
}

escapeRegExp(regExpString: string) {
    regExpString = regExpString.replace(/[\-\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    return regExpString.replace('][', '|').replace(/\[|\]/g, '');
}
}
