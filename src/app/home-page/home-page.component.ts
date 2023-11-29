import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { ExpensesByMonth } from 'src/model/types';
import people_expenses_lists from '../data/data';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'expense-tracker';
  menuOpen = false;
  expenseByMonth: ExpensesByMonth = people_expenses_lists;


  constructor(public apollo: Apollo) { }

  ngOnInit(): void {
    // this.login();
  }


  login() {
    const LOGIN = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `;
    return this.apollo.mutate({
      mutation: LOGIN,
      variables: {
        email: "walunjakarsachin@gmail.com",
        password: "Sachin@123"
      }
    }).subscribe(({data, loading}) => {
      if(!loading) {
        let token: string|undefined;
        if(data) token = (<any>data).login; 
        if(!token) return;
        localStorage.setItem('token', token);
        this.getExpense();
      }
    })
  }

  getExpense() {
    const EXPENSES = gql`
      query getExpenses {
        expenses {
          month
          personExpenses {
            personName
            personExpense {
              money
              tag
            }
          }
        }
      }
    `
    this.apollo.query({
      query: EXPENSES,
      context: {
        // example of setting the headers with context per operation
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
  
    }).subscribe(({data, loading}) => {
      if(data) console.log(data);
    });
  }
}
