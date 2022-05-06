import { CalculatorService } from './../../services/calculator.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent implements OnInit {

  numbers: string;
  result: number;

  constructor(private calculator: CalculatorService) { }

  ngOnInit(): void {
  }

  add(numbers: string): number {
    return this.calculator.add(numbers);
  }

  submit() {
    this.result = this.add(this.numbers);
  }

}
