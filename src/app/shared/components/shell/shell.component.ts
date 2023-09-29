import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Auth, authState, User } from '@angular/fire/auth';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  authState$: Observable<User | null>;
  user : User | null = null;
  sub !: Subscription;

  constructor(private breakpointObserver: BreakpointObserver, private auth: Auth){
    this.authState$ = authState(this.auth as any);
  }

  ngOnInit(){
    this.sub = this.authState$.subscribe((aUser: User | null) => {
      this.user = aUser;
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

  
}
