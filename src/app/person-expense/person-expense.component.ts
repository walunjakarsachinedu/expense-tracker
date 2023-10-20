import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Expense, PersonExpense } from 'src/model/types';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'person-expenses',
  templateUrl: './person-expense.component.html',
  styleUrls: ['./person-expense.component.scss']
})
export class PersonExpenseComponent implements OnInit {
  @Input() personExpenses: PersonExpense = {personName: "", expenses: []};
  @Output() onTotalExpenseChange: EventEmitter<number> = new EventEmitter<number>();
  isHovered = false; 

  ngOnInit():void {
    this.refreshExpense();
  }

  refreshExpense() {
    var totalExpense = 0;
    this.personExpenses?.expenses?.forEach(expense => totalExpense += expense.money ?? 0);
    this.onTotalExpenseChange.emit(totalExpense);
  }

  deleteExpense(id: string) {
    const index = this.personExpenses?.expenses?.findIndex(v => v.id == id);
    if(index != undefined && index != -1) this.personExpenses?.expenses?.splice(index, 1);
    this.refreshExpense();
  }

  addExpense() {
    const id = uuid();
    this.personExpenses?.expenses?.push({id});
  }
}
