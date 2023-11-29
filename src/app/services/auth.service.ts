import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) { }

  async login(email: string, password: string) : Promise<any> {
    const LOGIN = gql`
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password)
      }
    `;
    return new Promise((resolve, reject) => {
      const subscription = this.apollo.mutate({
        mutation: LOGIN,
        variables: {
          email: "walunjakarsachin@gmail.com",
          password: "Sachin@123"
        }
      }).subscribe({
        next: ({data, loading}) => {
          if(!loading) {
            let token: string|undefined;
            if(data) token = (<any>data).login; 
            if(!token) return reject("error in getting token");
            localStorage.setItem('token', token);
            resolve(token);
            subscription.unsubscribe();
          }
        },
        error: err => {
          reject(err);
          subscription.unsubscribe();
        }
      });
    });
  }
}
