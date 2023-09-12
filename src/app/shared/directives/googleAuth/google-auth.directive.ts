import { Directive, HostListener } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Directive({
  selector: '[appGoogleAuth]'
})
export class GoogleAuthDirective {

  constructor(private auth : Auth) { }

  @HostListener('click')
  onclick = () => {
    signInWithPopup(this.auth, new GoogleAuthProvider())
  }
}
