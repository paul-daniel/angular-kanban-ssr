import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren : () => import('./pages/home-page/home-page.module').then(m => m.HomePageModule)},
  {path: 'kanban', loadChildren : () => import('./pages/kanban/kanban.module').then(m => m.KanbanModule)},
  {path: 'login', loadChildren : () => import('./pages/user/user.module').then(m => m.UserModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
