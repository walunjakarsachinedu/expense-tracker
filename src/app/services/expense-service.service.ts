import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Expense, ExpenseTag, Month, PersonExpense } from 'src/model/types';
import { apolloRequestToPromise } from 'src/util/util';

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

  addPerson(expenseId: string, personName: string): Promise<PersonExpense> {
    const addPerson = gql`
      mutation addPerson($expenseId: String!, $personName: String!) {
        addPerson(expenseId: $expenseId, personName: $personName) {
            _id
            personName
            personExpense {
              _id
              money
              tag
            }
        }
      }
    `;
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: addPerson,
        variables: { expenseId, personName }
      }),
      "addPerson"
    )
  }

  removePerson(expenseId: string, personId: string): Promise<string> {
    const addPerson = gql`
      mutation removePerson($expenseId: String!, $personId: ID!) {
        removePerson(expenseId: $expenseId, personId: $personId)
      }
    `;
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: addPerson,
        variables: { expenseId, personId }
      }),
      "removePerson"
    )
  }

  updatePersonName(expenseId: string, personId: string, name: string): Promise<string> {
    const updatePersonName = gql`
      mutation updatePersonName($expenseId: String!, $personId: ID!, $name: String!) {
        updatePersonName(expenseId: $expenseId, personId: $personId, name: $name)
      }
    `;
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: updatePersonName,
        variables: { expenseId, personId, name}
      }),
      "updatePersonName"
    )
  }

  addPersonExpense(expenseId: string, personId: string, expenseTag: {money: number, tag: string}): Promise<ExpenseTag> {
    const addPersonExpense = gql`
      mutation addPersonExpense($expenseId: String!, $personId: ID!, $expenseTag: ExpenseTagInput!) {
        addPersonExpense(expenseId: $expenseId, personId: $personId, expenseTag: $expenseTag) {
          _id
          money
          tag
        }
      }
    `;
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: addPersonExpense,
        variables: { expenseId, personId, expenseTag}
      }),
      "addPersonExpense"
    );
  }

  updatePersonExpense(expenseId: string, personId: string, expenseTagId: string, expenseTag: {money: number, tag: string}): Promise<ExpenseTag> {
    const updatePersonExpense = gql`
      mutation updatePersonExpense($expenseId: String!, $personId: ID!, $expenseTagId: ID!, $expenseTag: ExpenseTagInput!) {
        updatePersonExpense(expenseId: $expenseId, personId: $personId, expenseTagId: $expenseTagId, expenseTag: $expenseTag) {
          _id
          money
          tag
        }
      }
    `; 
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: updatePersonExpense,
        variables: { expenseId, personId, expenseTagId, expenseTag }
      }),
      "updatePersonExpense"
    );
  }

  removePersonExpense(expenseId: string, personId: string, expenseTagId: string) : Promise<string> {
    const removePersonExpense = gql`
      mutation removePersonExpense($expenseId: String!, $personId: ID!, $expenseTagId: ID!) {
        removePersonExpense(expenseId: $expenseId, personId: $personId, expenseTagId: $expenseTagId)
      }
    `; 
    return apolloRequestToPromise(
      this.apollo.mutate({
        mutation: removePersonExpense,
        variables: { expenseId, personId, expenseTagId }
      }),
      "removePersonExpense"
    );
  }

}
