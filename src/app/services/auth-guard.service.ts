import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router) {}

  canActivate : CanActivateFn = (route, state) => {
    const token = localStorage.getItem('token');
    if(!token)  {
      this.router.navigate(['/login']);
      return false;
    }
  
    const timestamp = this.parseJwt(token).exp;
    const expireDate = new Date(timestamp * 1000);
    const now = new Date();
    if(expireDate > now) return true;
    this.router.navigate(['/login']);
    return false;
  }

  private parseJwt (token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }

}
