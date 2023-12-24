import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Expense } from 'src/model/types';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense-service.service';
import { getExpenseHistoryToFormatedString, monthIndexToEnum } from 'src/util/util';
import { ClipboardService } from 'ngx-clipboard';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'expense-tracker';
  menuOpen = false;
  expense?: Expense;
  month: number = (new Date()).getMonth()+1;
  year: number = (new Date()).getFullYear();
  isDataLoading = true;
  monthShortNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  monthIndexToEnum = monthIndexToEnum;


  constructor(
    private expenseService: ExpenseService, 
    private clipboardService: ClipboardService,
    private router: Router, 
    public cdr: ChangeDetectorRef
  ) { 
    this.loadMonthYearFromStorage();
  }

  ngOnInit(): void {
    this.loadExpense();
  }


  async loadExpense() {
    this.isDataLoading = true;
    try {
      this.expense = await this.expenseService.getExpenseByMonth(monthIndexToEnum[this.month], this.year);
    } catch (err) {
      console.log(err);
    }
    this.isDataLoading = false;
  }

  async createExpense() {
    this.isDataLoading = true;
    try {
      this.expense = await this.expenseService.createExpenseOfMonth(monthIndexToEnum[this.month], this.year);
    } catch (err) {
      console.log(err);
    }
    this.isDataLoading = false;
  }

  loadMonthYearFromStorage() {
    let selectedMonth = localStorage.getItem('selectedMonth');
    let selectedYear = localStorage.getItem('selectedYear');

    if(selectedMonth) this.month = parseInt(selectedMonth);
    if(selectedYear) this.year = parseInt(selectedYear);
  }


  onMonthSelect() {
    console.log("change event of month selector is fired");
    localStorage.setItem("selectedMonth", this.month.toString());
    localStorage.setItem("selectedYear", this.year.toString());
    this.loadExpense();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  copyExpenseHistory() {
    const expenseHistoryToFormatedString = getExpenseHistoryToFormatedString(this.expense!.personExpenses!);
    this.clipboardService.copy(expenseHistoryToFormatedString);
  }

}
