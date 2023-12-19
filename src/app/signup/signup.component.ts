import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupPageComponent implements OnInit {
  form: FormGroup;
  isAuthenticating = false;
  showError = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 
    this.form = fb.group({
      name: fb.control('', [Validators.required, Validators.minLength(3)]),
      email: fb.control('', [Validators.required, Validators.email]),
      password: fb.control('', [Validators.required, this.passwordValidator]),
      confirmPassword: fb.control('', [Validators.required, this.confirmPasswordValidator.bind(this)]),
    });
  }

  ngOnInit(): void {
    this.form.get('password')?.valueChanges.subscribe(() => {
      this.form.get('confirmPassword')?.updateValueAndValidity();
    });
  }

  passwordValidator(field: AbstractControl<any, any>): ValidationErrors | null {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const isPasswordValid = passwordRegex.test(field.value);
    if(isPasswordValid) return null;
    return { 'password': true }; 
  }

  confirmPasswordValidator(field: AbstractControl<any, any>): ValidationErrors | null {
    const passwordValue = this?.form?.get('password')?.value;
    return (field.value == passwordValue) ? null : { 'confirmPassword': true }; 
  }
  userAlreadyExists = false;
  async signup() {
    const name: string = this.form.controls['name'].value;
    const email: string = this.form.controls['email'].value;
    const password: string = this.form.controls['password'].value;

    localStorage.removeItem("token");
    if(this.form.valid) {
      this.isAuthenticating = true;
      try {
        await this.authService.signup({name, email, password}); 
        const token = localStorage.getItem('token');
        if(token) this.router.navigate(['/home']);
        else this.showError = true;
      } 
      catch (err: any) {
        if(err.graphQLErrors.find((err: any) => err.extensions.code == "USER_ALREADY_EXISTS")) {
          this.userAlreadyExists = true;
        }
        this.showError = true; 
      }  
      this.isAuthenticating = false;
    } else {
      this.form.controls["name"].markAsTouched();
      this.form.controls["email"].markAsTouched();
      this.form.controls["password"].markAsTouched();
      this.form.controls["confirmPassword"].markAsTouched();
    }
  }
}
