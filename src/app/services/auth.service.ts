import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { first } from 'rxjs';

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
      this.apollo.mutate({
        mutation: LOGIN,
        variables: { email, password }
      }).pipe(first()).subscribe({
        next: ({data, loading}) => {
          if(!loading) {
            let token: string|undefined;
            if(data) token = (<any>data).login; 
            if(!token) return reject("error in getting token");
            localStorage.setItem('token', token);
            resolve(token);
          }
        },
        error: err => {
          reject(err);
        }
      });
    });
  }

  async signup(name: string, email: string, password: string): Promise<any> {
    const SIGNUP = gql`
      mutation signup($name: String!, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
          _id
          email
          name
        }
      }
    `
    return new Promise((resolve, reject)=> {
      this.apollo.mutate({
        mutation: SIGNUP,
        variables: { name, email, password }
      }).pipe(first()).subscribe({
        next: async ({data, loading}) => {
          await this.login(email, password);
          resolve(data);
        },
        error: err => {
          reject(err);
        }
      });
    });
  }
}

