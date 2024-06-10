import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  inject,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  Signal,
  signal,
} from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

const dummyNumber = 123456.78;

@Directive({
  selector: 'input[numberFormatInput]',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberFormatDirective),
      multi: true,
    },
  ],
})
export class NumberFormatDirective implements ControlValueAccessor, OnChanges {
  readonly inputElement = inject<ElementRef<HTMLInputElement>>(
    ElementRef<HTMLInputElement>
  ).nativeElement;
  readonly #renderer = inject(Renderer2);

  numberFormat = new Intl.NumberFormat(navigator.language, {
    style: 'decimal',
  });

  #isFocused!: boolean;

  readonly parts = signal<Intl.NumberFormatPart[]>([]);

  constructor() {
    this.parts.set(this.numberFormat.formatToParts(dummyNumber));
  }

  onChange: (_value: number | undefined | null) => void = () => {};

  onTouched: () => void = (): void => {};

  ngOnChanges(changes: SimpleChanges): void {
    throw new Error('Method not implemented.');
  }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn: (_value: number | undefined | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.#renderer.setProperty(this.inputElement, 'disabled', isDisabled);
  }

  @HostListener('focus') focus(): void {
    this.#isFocused = true;
  }

  @HostListener('blur') lostFocus(): void {
    this.#isFocused = false;
  }

  @HostListener('input', ['$event.target.value']) input(
    inputEvent: InputEvent
  ): void {
    const { value, selectionStart } = this.inputElement;
    const parts = this.numberFormat.formatToParts(dummyNumber);
  }
}
