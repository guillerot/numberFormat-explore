import { Component, signal } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { NumberFormatDirective } from './number-format.directive';

const dummyNumber = 123456.78;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NumberFormatDirective],
  template: `
    <h1>Hello from {{ name }}!</h1>
    <a target="_blank" href="https://angular.dev/overview">
      Learn more about Angular
    </a>

    <div>{{valueFormatted()}}</div>

    <div>
      <ul>
        @for (part of parts(); track $index) {
          <li>{{ part.value + ' - ' + part.type }}</li>
        }
      </ul>
    </div>

    <div>
      <input numberFormatInput type="text" #theInput>
    </div>
  `,
})
export class App {
  name = 'Angular';
  numberFormat = new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
  });
  readonly parts = signal<Intl.NumberFormatPart[]>([]);
  readonly valueFormatted = signal<string>('');

  constructor() {
    this.parts.set(this.numberFormat.formatToParts(dummyNumber));
    this.valueFormatted.set(this.numberFormat.format(dummyNumber));
  }
}

bootstrapApplication(App);
