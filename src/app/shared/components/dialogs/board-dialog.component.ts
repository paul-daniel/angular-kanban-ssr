import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';

interface BoardData {
  title : string
}

@Component({
  selector: 'app-board-dialog',
  template: `
    <mat-card class="dialog-container">
      <h1 mat-dialog-title>Create A Board</h1>
      <div mat-dialog-content>
      <p>What shall we call this board?</p>
        <mat-form-field>
          <input placeholder="title" matInput [(ngModel)]="data.title" />
        </mat-form-field>
      </div>
      <div mat-dialog-actions>
        <button mat-stroked-button (click)="dialogRef.close()" class="u-space-sm">Cancel</button>
        <button mat-flat-button (click)="dialogRef.close(data.title)" color="accent" cdkFocusInitial>
          Create
        </button>
      </div>
    </mat-card>
  `,
  styleUrls: ['./dialog.scss']
})
export class BoardDialogComponent {
  constructor(public dialogRef: DialogRef<string>, @Inject(DIALOG_DATA) public data: BoardData, private boardService: BoardService) {}
}
