import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent {
  form: FormGroup;
  constructor(private authService: AuthService, private router: Router) { 
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]) ,
      password: new FormControl('', [Validators.required])
    });
  }

  showError = false;
  isAuthenticating = false;
  isFormSumitted = false;

  

  async login() {
    const email: string = this.form.controls['email'].value;
    const password: string = this.form.controls['password'].value;

    localStorage.removeItem("token");
    if(this.form.valid) {
      this.isAuthenticating = true;
      try {
        await this.authService.login(email, password); 
        const token = localStorage.getItem('token');
        if(token) this.router.navigate(['/home']);
        else this.showError = true;
        this.isAuthenticating = false;
      } catch (err) {
        this.showError = true; 
        this.isAuthenticating = false;
      }
    } else {
      this.form.controls["email"].markAsTouched();
      this.form.controls["password"].markAsTouched();
    }
  }



}
