import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanRoutingModule } from './kanban-routing.module';
import { KanbanPageComponent } from './kanban-page/kanban-page.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    KanbanPageComponent
  ],
  imports: [
    CommonModule,
    KanbanRoutingModule,
    SharedModule
  ]
})
export class KanbanModule { }
