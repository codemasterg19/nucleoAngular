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
          email:['', Validators.required, Validators.email],
          password: ['', [Validators.required, Validators.minLength(8)]],
        })
    
  }

  get email() {return this.loginForm.get("email")};
  get password() {return this.loginForm.get("password")};
  get confirmPassword() {return this.loginForm.get("confirmPassword")}

  toggleRegister(){
    this.showRegister = !this.showRegister;
  }

  login(){
    if(this.email?.invalid || this.password?.invalid) return;
    if(this.showRegister){
      if(this.confirmPassword?.invalid) return;
      this.authService.registerWithEmail(this.email?.value, this.password?.value)
      .then( () => {
        this.errorMessage = "";
        this.userService.loadUserinFirebase();
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
      this.userService.loadUserinFirebase();
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
      this.userService.loadUserinFirebase();
    })
    .catch(err =>{
      console.log(err);
      this.errorMessage = err.message;
    })
  }



  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null =>{ 
      if(!this.showRegister) return null;
      const error = this.password?.value !== control.value;
      return error ? {confirmPassword: {value: control.value}} : null;
    }
  }

}
