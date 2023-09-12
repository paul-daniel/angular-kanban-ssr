import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';

import { ShellComponent } from './components/shell/shell.component';
import { GoogleAuthDirective } from './directives/googleAuth/google-auth.directive';
import { LoginSignupComponent } from './components/login-signup/login-signup.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const modules = [
  CommonModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  LayoutModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatIconModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  MatTabsModule,
  RouterModule, 
  ReactiveFormsModule
];

const components = [
  ShellComponent,
  LoginSignupComponent,
  GoogleAuthDirective
]

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    ...modules,
  ], 
  exports: [
    ...modules,
    ...components
  ]
})
export class SharedModule { }
