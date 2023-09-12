import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Auth, User, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth'

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.scss']
})
export class LoginSignupComponent {
  @Input() type : 'login' |'signup' = 'login'

  loginForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
  })

  signupForm = new FormGroup({
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)]),
    confirmPassword : new FormControl('', [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)])
  })

  user : User | null = null

  constructor(private auth : Auth){

  }

  onSubmit() {
    if(this.loginForm.valid && this.type === 'login'){
      const {email, password} = this.loginForm.value
      if(this.type === 'login'){
        signInWithEmailAndPassword(this.auth, email as string, password as string)
        .catch(error => console.error(error))
      }
    }
    if(this.signupForm.valid && this.type ==='signup'){
      const {email, password, confirmPassword} = this.signupForm.value
      if(this.type === 'signup' && password === confirmPassword){
        createUserWithEmailAndPassword(this.auth, email as string, password as string)
        .catch(error => console.error(error))
      }
    }
  }
}
