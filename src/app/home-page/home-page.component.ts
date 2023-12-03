import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Expense } from 'src/model/types';
import { Router } from '@angular/router';
import { ExpenseService } from '../services/expense-service.service';
import { monthIndexToMonthEnum } from 'src/util/util';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'expense-tracker';
  menuOpen = false;
  expense?: Expense;
  month: number = (new Date()).getMonth();
  year: number = (new Date()).getFullYear();
  isDataLoading = true;


  constructor(
    private expenseService: ExpenseService, 
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
      this.expense = await this.expenseService.getExpenseByMonth(monthIndexToMonthEnum(this.month), this.year);
    } catch (err) {
      console.log(err);
    }
    this.isDataLoading = false;
  }

  async createExpense() {
    this.isDataLoading = true;
    try {
      this.expense = await this.expenseService.createExpenseOfMonth(monthIndexToMonthEnum(this.month), this.year);
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
    localStorage.setItem("selectedMonth", this.month.toString());
    localStorage.setItem("selectedYear", this.year.toString());
    this.loadExpense();
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
