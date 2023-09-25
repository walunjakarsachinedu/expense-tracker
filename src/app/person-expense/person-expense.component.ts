import { Component, Input, OnInit } from '@angular/core';
import { Expense, PersonExpense } from 'src/model/types';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'person-expenses',
  templateUrl: './person-expense.component.html',
  styleUrls: ['./person-expense.component.css']
})
export class PersonExpenseComponent {
  @Input() personExpenses?: PersonExpense;
  isHovered = false; 

  deleteExpense(id: string) {
    const index = this.personExpenses?.expenses?.findIndex(v => v.id == id);
    if(index != undefined && index != -1) this.personExpenses?.expenses?.splice(index, 1);
  }

  addExpense() {
    const id = uuid();
    this.personExpenses?.expenses?.push({id});
  }
}
