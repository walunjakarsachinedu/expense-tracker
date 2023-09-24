import { Component, Input, OnInit } from '@angular/core';
import { Expense, PersonExpense } from 'src/model/types';

@Component({
  selector: 'person-expenses',
  templateUrl: './person-expense.component.html',
  styleUrls: ['./person-expense.component.css']
})
export class PersonExpenseComponent {
  @Input() personExpense?: PersonExpense;
}
