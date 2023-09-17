import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

const routes: Routes = [
  {
    path: '', 
    canActivate: [authGuard], 
    loadChildren : () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'kanban',
     canActivate: [authGuard],
      loadChildren : () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule)
  },
  {
    path: 'login',
    canActivate: [],
    loadChildren : () => import('./pages/user/user.module').then(m => m.UserModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
