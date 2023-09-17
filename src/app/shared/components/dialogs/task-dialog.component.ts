import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { TaskData } from '../board/board.component';



@Component({
  selector: 'app-task-dialog',
  template: `
    <mat-card class="dialog-container">
      <h1 mat-dialog-title>Task</h1>
      <div mat-dialog-content class="content">
        <mat-form-field>
          <textarea
            placeholder="Task description"
            matInput
            [(ngModel)]="data.task.description"
          ></textarea>
        </mat-form-field>
        <br />
        <mat-button-toggle-group
          #group="matButtonToggleGroup"
          [(ngModel)]="data.task.label"
        >
          <mat-button-toggle *ngFor="let opt of labelOptions" [value]="opt">
            <mat-icon [ngClass]="opt">{{
              opt === 'gray' ? 'check_circle' : 'lens'
            }}</mat-icon>
          </mat-button-toggle>
        </mat-button-toggle-group>
      </div>
      <div mat-dialog-actions>
        <button mat-flat-button color="accent" class="u-mt-sm" (click)="dialogRef.close(data)" cdkFocusInitial>
          {{ data.isNew ? 'Add Task' : 'Update Task' }}
        </button>

      </div>
    </mat-card>
  `,
  styleUrls: [
    './dialog.scss'
  ]
})
export class TaskDialogComponent {

  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: any) {}
}
