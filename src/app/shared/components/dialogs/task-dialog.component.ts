import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
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
        <button mat-flat-button color="accent" class="u-mt-sm u-space-sm" (click)="dialogRef.close(data)">
          {{ data.isNew ? 'Add Task' : 'Update Task' }}
        </button>
        <button *ngIf="!data.isNew && !extended" mat-button color="warn" class="u-mt-sm" (click)="toggleConfirm()">
          <mat-icon>delete</mat-icon>
        </button>
        <span *ngIf="extended" class="delete-conf">
          <button mat-flat-button color="warn" class="u-mt-sm u-space-sm" (click)="dialogRef.close('delete')">
            <mat-icon>delete</mat-icon> Confirm
          </button>
          <button mat-button (click)="toggleConfirm()" class="u-mt-sm">Cancel</button>
        </span>
      </div>
    </mat-card>
  `,
  styleUrls: [
    './dialog.scss'
  ]
})
export class TaskDialogComponent {

  extended = false

  labelOptions = ['purple', 'blue', 'green', 'yellow', 'red', 'gray'];

  constructor(public dialogRef: DialogRef<TaskData | 'delete'>, @Inject(DIALOG_DATA) public data: TaskData) {}

  toggleConfirm(): void {
    this.extended = !this.extended;
  }
}
