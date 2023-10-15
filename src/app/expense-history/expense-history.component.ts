import { Component, Input } from '@angular/core';
import { PersonExpense } from 'src/model/types';

@Component({
  selector: 'expense-history',
  templateUrl: './expense-history.component.html',
  styleUrls: ['./expense-history.component.scss']
})
export class ExpenseHistoryComponent {
  @Input() people_expenses_lists: PersonExpense[] = [];
  total?: number;

  refreshExpense() {
    this.total = 0;
    this.people_expenses_lists.forEach(person => person.expenses?.forEach(expense => this.total! += expense.money ?? 0));
  }

  ngOnInit():void {
    this.refreshExpense();
  }
}
