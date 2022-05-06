import { CalculatorService } from './../../services/calculator.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorComponent } from './calculator.component';

describe('CalculatorComponent', () => {
  let calculatorService: CalculatorService;
  let component: CalculatorComponent;
  let fixture: ComponentFixture<CalculatorComponent>;

  beforeEach(async () => {
    calculatorService = new CalculatorService();
    await TestBed.configureTestingModule({
      declarations: [ CalculatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basic functionality', () => {
    it('testing function add', () => {
      expect(component.add("1,2")).toBe(3);
    });

    it('testing function submit', () => {
      component.numbers = "1,2";
      expect(component.submit());
    });

    it('add should return 0 on empty string', () => {
      expect(calculatorService.add('')).toBe(0);
    });

    it('add should return the correct sum for simple input values', () => {
      expect(calculatorService.add('1')).toBe(1);
      expect(calculatorService.add('1,2')).toBe(3);
    });

    it('add should return the correct sum for an arbitrary number of input values', () => {
      expect(calculatorService.add('1,2,3,4')).toBe(10);
    });
  });

  describe('New line handling', () => {
    it('add should consider new line characters as well as commas as delimiters', () => {
      expect(calculatorService.add('1\n2,3,4')).toBe(10);
    });
  });

  describe('Handling user-defined delimiters', () => {
    it('getDelimiter should return the default delimiters if no user-defined delimiter is given', () => {
      expect(calculatorService.getComponents('1,2,3,4').delimiter.source).toBe(',|\\n');
    });

    it('getDelimiter should return user-defined delimiters', () => {
      expect(calculatorService.getComponents('//;\n1;2').delimiter.source).toBe(';');
    });

    it('add should return the correct sum for user-defined delimiters', () => {
      expect(calculatorService.add('//;\n1;2')).toBe(3);
    });
  });

  describe('Handling negative input values', () => {
    it('add should not allow negative values', () => {
      expect(() => { calculatorService.add('1,-2,3,4') }).toThrowError('No negative values are allowed: -2');
      expect(() => { calculatorService.add('1,-2,3,-4') }).toThrowError('No negative values are allowed: -2, -4');
    });
  });

  describe('Ignore values greater than 1000', () => {
    it('add should ignore values greater than 1000', () => {
      expect(calculatorService.add('1,1000,3,4,1001')).toBe(1008);
    });
  });

  describe('Handling arbitrary-length delimiters', () => {
    it('escapeRegExp should escape special regular expression characters', () => {
      expect(calculatorService.escapeRegExp('***')).toBe('\\*\\*\\*');
    });

    it('getDelimiter should return the correct user-defined delimiter regardless of delimiter length', () => {
      expect(calculatorService.getComponents('//[***]\n1***2***3').delimiter.source).toBe('\\*\\*\\*');
    });

    it('add should return the correct sum for arbitrary-length delimiters', () => {
      expect(calculatorService.add('//[***]\n1***2***3')).toBe(6);
    });
  });

  describe('Allow multiple delimiters', () => {
    it('add should return the correct sum for arbitrary-length delimiters', () => {
      expect(calculatorService.add('//[*][%]\n1*2%3')).toBe(6);
    });
  });

  describe('Allow multiple arbitrary-length delimiters', () => {
    it('add should return the correct sum for multiple arbitrary-length delimiters', () => {
      expect(calculatorService.add('//[***][%%%]\n1***2%%%3')).toBe(6);
    });
  });
});
