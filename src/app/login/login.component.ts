import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPageComponent {
  showError = false;
  form: FormGroup;
  isAuthenticating = false;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) { 
    this.form = fb.group({
      email: fb.control('', [Validators.required, Validators.email]) ,
      password: fb.control('', [Validators.required])
    });
  }


  

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
