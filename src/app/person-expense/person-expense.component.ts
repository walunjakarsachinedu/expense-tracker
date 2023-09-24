import { Component, Input, OnInit } from '@angular/core';
import { Expense, PersonExpense } from 'src/model/types';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'person-expenses',
  templateUrl: './person-expense.component.html',
  styleUrls: ['./person-expense.component.css']
})
export class PersonExpenseComponent {
  @Input() personExpense?: PersonExpense;
  isHovered = false; 

  deleteExpense(id: string) {
    const index = this.personExpense?.expenses?.findIndex(v => v.id == id);
    if(index != undefined && index != -1) this.personExpense?.expenses?.splice(index, 1);
  }

  addExpense() {
    const id = uuid();
    this.personExpense?.expenses?.push({id});
  }
}
