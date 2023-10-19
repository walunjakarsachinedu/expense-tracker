import { Component, EventEmitter, Input, Output, ɵisEnvironmentProviders } from '@angular/core';
import { Expense } from 'src/model/types';
import { v4 } from 'uuid';

@Component({
  selector: 'expense-tag',
  templateUrl: './expense-tag.component.html',
  styleUrls: ['./expense-tag.component.scss']
})
export class ExpenseTagComponent {
  @Output() onValueChange = new EventEmitter<Expense>();
  @Output() onExpenseDelete = new EventEmitter<string>();
  @Input() expense: Expense = {id: v4()};
  isHovered = false;
}
