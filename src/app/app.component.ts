import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { NgFor, NgIf } from '../../node_modules/@angular/common';

interface Option {
  id: number;
  value: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, NgIf, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  numberInput: string = '';
  numbers: number[] = [];
  numbersLength: number = this.numbers.length;
  twentyFivePercentile: number = this.numbersLength; // 4;
  frequency = this.Mode(this.numbers);
  showDropdown: boolean = false;

  options: Option[] = [
    { id: 1, value: 'Last Number' },
    { id: 2, value: 'Middle Number' },
    { id: 3, value: 'First Number' },
  ];
  selectedValue: string = '';

  IsNotANumber(number: string): boolean {
    if (isNaN(Number(number))) return false;

    return true;
  }

  AddNumber() {
    try {
      if (this.IsNotANumber(this.numberInput) == false) {
        console.log(`This number ${this.numberInput} is not a number!`);
      } else if (this.numberInput == '') {
        console.log('\nEmpty Input!');
      } else {
        this.numbers.push(parseInt(this.numberInput));
      }

      this.Mode(this.numbers);
    } catch (error) {
      console.log('An error occured');
    } finally {
      console.log('Retry!');
    }
  }

  RemoveNumber() {
    if (this.selectedValue === 'Last Number') {
      this.numbers.pop();
    } else if (this.selectedValue === 'Middle Number') {
      const midIndex = Math.floor(this.numbers.length / 2);
      this.numbers.splice(midIndex, 1);
    } else if (this.selectedValue === 'First Number') {
      this.numbers.shift();
    }
  }

  GetFrequency(array: number[]): Map<number, number> {
    const frequency = new Map<number, number>();

    for (const num of array) {
      frequency.set(num, (frequency.get(num) || 0) + 1);
    }

    return frequency;
  }

  Ascending(array: number[]) {
    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => a - b);

    return sorted;
  }

  Descending(array: number[]) {
    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => b - a);

    return sorted;
  }

  Mode(array: number[]): number | null {
    const frequency = this.GetFrequency(array);

    let maxCount = 0;
    let mode: number | null = null;

    for (const [num, count] of frequency.entries()) {
      if (count > maxCount) {
        maxCount = count;
        mode = num;
      }
    }

    return mode;
  }

  Median(array: number[]): number | null {
    if (array.length === 0) return null;

    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    if (sorted.length % 2 === 0) {
      const left = sorted[mid - 1];
      const right = sorted[mid];

      if (left === undefined || right === undefined) return null;

      // even length -> average of the two numbers
      return (left + right) / 2;
    } else {
      // odd length -> average of the two numbers
      return sorted[mid];
    }
  }

  Mean(array: number[]): number | null {
    let sum = 0;

    for (const a in array) {
      sum += array[a];
    }

    return sum;
  }

  Average(array: number[]): number | null {
    const sum = this.Mean(this.numbers);

    if (sum === null) return null;

    return sum / array.length;
  }

  MinPercentile(array: number[]): number | null {
    if (array.length === 0) return null;

    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => a - b);

    const min = sorted[0];

    return min;
  }

  TFPercentile(array: number[]): number | null {
    // 25th percentile
    if (array.length === 0) return null;

    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => a - b);

    const n = sorted.length;
    const pos = (n - 1) * 0.25;

    const lower = Math.floor(pos);
    const upper = Math.floor(pos);

    if (lower === upper) return sorted[lower];

    // linear interpolation
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (pos - lower);
  }

  SFPercentile(array: number[]): number | null {
    // 75th percentile
    if (array.length === 0) return null;

    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => a - b);

    const n = sorted.length;
    const pos = (n - 1) * 0.75;

    const lower = Math.floor(pos);
    const upper = Math.floor(pos);

    if (lower === upper) return sorted[lower];

    // linear interpolation
    return sorted[lower] + (sorted[upper] - sorted[lower]) * (pos - lower);
  }

  MaxPercentile(array: number[]): number | null {
    if (array.length === 0) return null;

    const sorted = [...array].filter((n) => !isNaN(n)).sort((a, b) => a - b);

    const max = sorted[array.length - 1];

    return max;
  }
}
