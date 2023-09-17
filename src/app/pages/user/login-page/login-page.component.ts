import { Component, OnInit, inject } from '@angular/core';
import { User, authState, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{
  public auth: Auth = inject(Auth);
  authState$ = authState(this.auth as any);
  user : User | null = null;


  ngOnInit(){
    this.authState$.subscribe((aUser: User | null) => {
      this.user = aUser;
    })
  }

}
