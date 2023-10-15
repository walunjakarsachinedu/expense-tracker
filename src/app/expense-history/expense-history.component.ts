import { Component, Input } from '@angular/core';
import { PersonExpense } from 'src/model/types';

@Component({
  selector: 'expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.scss']
})
export class ExpenseHistoryComponent {
  @Input() people_expenses_lists: PersonExpense[] = [];
}
