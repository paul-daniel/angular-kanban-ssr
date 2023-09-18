import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

interface ConfirmData {
  confirm : boolean
}

@Component({
  selector: 'app-delete-dialog',
  template: `
    <mat-card class="dialog-container">
      <p mat-dialog-title>Do you really want to proceed ?</p>
      <div mat-dialog-actions>
        <button mat-stroked-button class="u-space-sm" (click)="dialogRef.close(false)">Cancel</button>
        <button mat-flat-button color="accent" (click)="dialogRef.close(true)">Confirm</button>
      </div>
    </mat-card>
  `,
  styleUrls: [
    './dialog.scss'
  ]
})
export class DeleteDialogComponent {
  constructor(public dialogRef: DialogRef<boolean>, @Inject(DIALOG_DATA) public data: ConfirmData) {}
}
