import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-task-dialog',
  template: `
    <p>
      task-dialog works!
    </p>
  `,
  styles: [
  ]
})
export class TaskDialogComponent {
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: unknown) {}
}
