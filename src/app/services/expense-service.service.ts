import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { first } from 'rxjs';
import { Expense, Month } from 'src/model/types';
import { apolloRequestToPromise, getUserId } from 'src/util/util';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  constructor(private apollo: Apollo) { }

  getExpenseByMonth(month: Month, year: number) : Promise<Expense> {
    const expenseOfMonth = gql`
      query expenseOfMonth($month: Month!, $year: Int!) {
        expenseOfMonth(month: $month, year: $year) {
          _id
          month
          year
          personExpenses {
            _id
            personName
            personExpense {
              _id
              money
              tag
            }
          }
        }
      }
    `
    return apolloRequestToPromise(
      this.apollo.query({
        query: expenseOfMonth,
        variables: { month, year }
      }), 
      "expenseOfMonth"
    );
  }

  createExpenseOfMonth(month: Month, year: number): Promise<Expense> {
    const addExpense = gql`
      mutation addExpense($month: Month!, $year: Int!) {
        addExpense(month: $month, year: $year) {
          _id
          userId
          month
          year
          personExpenses {
            _id
            personName
            personExpense {
              _id
              money
              tag
            }
          }
        }
      }
    `;
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: addExpense,
        variables: { month, year }
      }), 
      "addExpense"
    );
  }

}
