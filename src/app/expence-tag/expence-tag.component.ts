import { Component, EventEmitter, Input, Output, ɵisEnvironmentProviders } from '@angular/core';
import { ExpenseTag } from 'src/model/types';
import { v4 } from 'uuid';

@Component({
  selector: 'expense-tag',
  templateUrl: './expense-tag.component.html',
  styleUrls: ['./expense-tag.component.scss']
})
export class ExpenseTagComponent {
  @Output() onValueChange = new EventEmitter<ExpenseTag>();
  @Output() onExpenseDelete = new EventEmitter<string>();
  @Input() expense: ExpenseTag = {_id: v4()};
  @Output() onBlur = new EventEmitter<void>();
  isHovered = false;
}
