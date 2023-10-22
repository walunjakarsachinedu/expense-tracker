import { Component, Input } from '@angular/core';
import { PersonExpense } from 'src/model/types';
import { v4 } from 'uuid';

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

  addExpense() {
    this.people_expenses_lists.push({id: v4(), personName:"", expenses: [{id: v4()}]})
  }

  ngOnInit():void {
    this.refreshExpense();
  }

  deletePerson(id: string) {
    for(let i=0; i<this.people_expenses_lists.length; i++) {
      if(this.people_expenses_lists[i].id == id) {
        this.people_expenses_lists.splice(i, 1);
        break;
      }
    }
  }
}
