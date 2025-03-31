import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  showRegister: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router,
      private userService: UsersService  ) {

        this.loginForm = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['']
        });
        
    
  }

  get email() {return this.loginForm.get("email")};
  get password() {return this.loginForm.get("password")};
  get confirmPassword() {return this.loginForm.get("confirmPassword")}

  toggleRegister() {
    this.showRegister = !this.showRegister;
  
    if (this.showRegister) {
      this.loginForm.setValidators(this.confirmPasswordValidator());
    } else {
      this.loginForm.clearValidators();
    }
  
    this.loginForm.updateValueAndValidity();
  }
  

  login(){
    if(this.email?.invalid || this.password?.invalid) return;
    if(this.showRegister){
      if(this.confirmPassword?.invalid) return;
      this.authService.registerWithEmail(this.email?.value, this.password?.value)
      .then( () => {
        this.errorMessage = "";
        this.userService.loadUserInFirebase();
        this.router.navigate(['/cursos']);
      })
      .catch(err => {
        console.log(err);
        this.errorMessage = err.message;
      });
      return;
      
    }
    this.authService.loginWithEmail(this.email?.value, this.password?.value)
    .then(() => {
      this.errorMessage = "";
      this.userService.loadUserInFirebase();
      this.router.navigate(['/cursos']);
    })
    .catch(err => {
      console.log(err);
      this.errorMessage = err.message;
    })
    
  }

  registerWithGoogle(){
    this.authService.loginWithGoogle()
    .then(() => {
      this.errorMessage = "",
      this.userService.loadUserInFirebase();
      this.router.navigate(['/cursos']);
    })
    .catch(err =>{
      console.log(err);
      this.errorMessage = err.message;
    })
  }



  confirmPasswordValidator(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const confirm = group.get('confirmPassword')?.value;
      return password !== confirm ? { confirmPassword: true } : null;
    };
  }
  

}
