import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import {Auth, authState } from '@angular/fire/auth'
import { Observable, map, tap } from 'rxjs';
import { SnackService } from 'src/app/services/snack/snack.service';

@Injectable({
  providedIn : 'any'
})
class PermissionService {
  authState$ = authState(this.auth as any)
  constructor(private auth: Auth, private snackbarService : SnackService) {

  }

  canActivate() : Observable<boolean>{
    return this.authState$.pipe(
      map(user => !!user),
      tap(isLoggedIn=>{
        !isLoggedIn && this.snackbarService.authError()
      })
    )
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(PermissionService).canActivate()
};
