import { Component } from '@angular/core';
import { PersonExpense, ExpensesByMonth } from 'src/model/types';
import people_expenses_lists from './data/data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'expense-tracker';
  expenseByMonth: ExpensesByMonth = people_expenses_lists;
}
