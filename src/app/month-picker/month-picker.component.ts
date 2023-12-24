import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DateTime, Info } from 'luxon';

@Component({
  selector: 'monthpicker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss']
})
export class MonthPickerComponent implements OnInit, OnDestroy {

  @Input() locale?: string;
  @Input() year?: number;
  @Input() month?: number;

  @Input() enabledMonths: Array<number> = [];
  @Input() disabledMonths: Array<number> = [];

  @Input() enabledYears: Array<number> = [];
  @Input() disabledYears: Array<number> = [];

  @Input() multiple?: boolean;

  @Output() yearChange = new EventEmitter<number>();

  @Output() change = new EventEmitter<{ monthIndex: number, year: number }>();

  @Output() onClickOutside = new EventEmitter<void>();

  isFirstClickedOutside = true;
  isYearSelectedRecently = false;

  currentlySelectedYear?: number;

  model?: MonthPickerModel;

  ngOnInit() {
    if (this.locale) {
      // Luxon doesn't have a direct locale setting like Moment.js
      // You might want to handle locale in a different way if needed
    }

    this.model = new MonthPickerModel();

    if (this.year) {
      this.model!.selectedYear = DateTime.local().set({ year: this.year });
      this.model!.updateYearText();
    }

    if (this.month) {
      this.model!.selectedMonthIndex = this.month;
      this.model!.selectedMonth = DateTime.local().set({ month: this.month });
      this.currentlySelectedYear = this.model!.selectedMonthYear;
    }

    this.currentlySelectedYear = this.model?.selectedYear.year;

    document.addEventListener('click', this.clickOutOfMonthPickerListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.clickOutOfMonthPickerListener);
  }

  clickOutOfMonthPickerListener = (event: any) => {
    if (this.isFirstClickedOutside) {
      this.isFirstClickedOutside = false;
      return;
    }
    if(this.isYearSelectedRecently) {
      this.isYearSelectedRecently = false;
      return;
    }
    const monthPicker = document.getElementsByClassName('month-picker')[0] as HTMLElement;
    const isClickInsideMonthPicker = monthPicker.contains(event.target as Node);
    if (!isClickInsideMonthPicker) this.onClickOutside.emit();
  };

  decrement() {
    this.model?.decrementYear(this.isShowYears ? 12 : 1);
    if (this.isShowYears) {
      this.renderYears();
    }
  }

  increment() {
    this.model?.incrementYear(this.isShowYears ? 12 : 1);
    if (this.isShowYears) {
      this.renderYears();
    }
  }

  selectMonth(index: number) {
    this.selectYear(this.model!.selectedYear.year);
    this.model!.selectMonth(index);
    this.onChange(this.model!.selectedMonthIndex, this.model!.selectedMonthYear);
  }

  isSelectedMonth(monthIndex: number) {
    return this.model!.selectedMonthIndex == monthIndex && this.currentlySelectedYear == this.model!.selectedYear.year;
  }

  onChange(monthIndex: number, year: number) {
    this.change.emit({ monthIndex: monthIndex, year: year });
  }

  isDisabled(index: number) {
    let disabled = false;
    if (this.enabledMonths && this.enabledMonths.length > 0) {
      disabled = this.enabledMonths.indexOf(index) < 0;
    }
    if (this.disabledMonths && this.disabledMonths.length > 0) {
      disabled = this.disabledMonths.indexOf(index) >= 0;
    }
    return disabled;
  }

  isShowYears: boolean = false;
  years: Array<number> = [];
  toggleShowYears() {
    this.isShowYears = !this.isShowYears;
    this.renderYears();
  }

  renderYears() {
    this.years = [];
    for (let i = 5; i > 0; i--) {
      this.years.push(this.model!.selectedYear.year - i);
    }
    for (let i = 0; i <= 6; i++) {
      this.years.push(this.model!.selectedYear.year + i);
    }
  }

  selectYear(year: number) {
    this.isYearSelectedRecently = true;
    this.isShowYears = false;
    this.model!.selectedYear = DateTime.local().set({ year: year });
    this.currentlySelectedYear = year;
    this.yearChange.emit(year);
    this.model!.updateYearText();
    this.change.emit({ monthIndex: this.model!.selectedMonthIndex, year: year });
  }

  isSelectedYear(year: number) {
    return this.currentlySelectedYear === year;
  }

  isDisabledYear(year: number) {
    let disabled = false;
    if (this.enabledYears && this.enabledYears.length > 0) {
      disabled = this.enabledYears.findIndex(y => y === year) < 0;
    }
    if (this.disabledYears && this.disabledYears.length > 0) {
      disabled = this.disabledYears.findIndex(y => y === year) >= 0;
    }
    return disabled;
  }
}

export class MonthPickerModel {
  constructor() {
    this.selectedYear = DateTime.local();
    this.updateYearText();

    this.selectedMonth = DateTime.local();

    this.months = Info.months();
    this.selectedMonthIndex = this.selectedMonth.month;
    this.selectedMonthYear = this.selectedYear.year;
  }

  selectedYear: DateTime;
  selectedYearText?: string;

  selectedMonth: DateTime;
  selectedMonthIndex: number;
  selectedMonthYear: number;

  months: Array<string> = [];

  updateYearText() {
    this.selectedYearText = this.selectedYear.toFormat('yyyy');
  }

  selectMonth(index: number) {
    this.selectedMonth = DateTime.local().set({ month: index });
    this.selectedMonthIndex = this.selectedMonth.month;
    this.selectedMonthYear = this.selectedYear.year;
  }

  incrementYear(unit = 12) {
    this.selectedYear = this.selectedYear.plus({ years: unit });
    this.updateYearText();
  }

  decrementYear(unit = 12) {
    this.selectedYear = this.selectedYear.minus({ years: unit });
    this.updateYearText();
  }
}
