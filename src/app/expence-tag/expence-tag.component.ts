import { Component, EventEmitter, Input, Output, ɵisEnvironmentProviders } from '@angular/core';
import { Expense } from 'src/model/types';

@Component({
  selector: 'expense-tag',
  templateUrl: './expense-tag.component.html',
  styleUrls: ['./expense-tag.component.css']
})
export class ExpenseTagComponent {
  @Output() onValueChange = new EventEmitter<Expense>();
  @Input() money?: number;
  @Input() tag?: string;
}
