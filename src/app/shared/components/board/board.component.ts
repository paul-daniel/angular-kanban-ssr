import { Dialog } from '@angular/cdk/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Board, Task } from 'src/app/pages/kanban/board.model';
import { BoardService } from 'src/app/services/board/board.service';
import { TaskDialogComponent } from '../dialogs/task-dialog.component';

export interface TaskData {
  task : Task,
  isNew : boolean,
  boardId ?: string,
  idx ?: number,
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board !: Board;

  constructor(private boardService: BoardService, private dialog: Dialog){
    this.board
  }

  taskDrop(event : CdkDragDrop<string[]>){
    if(!this.board.tasks || !this.board.id) return;
    
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex)
    this.boardService.updateTask(this.board.id, this.board.tasks)
  }

  openDialog(task ?: Task, idx ?: number): void{
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.id, idx }
        : { task: newTask, isNew: true }
    });

    dialogRef.closed.subscribe(result => {
      if (result) {
        const res = result as TaskData;
        if (res.isNew) {
          this.boardService.updateTask(this.board.id!, [
            ...this.board.tasks!,
            res.task
          ]);
        } else {
          const update = this.board.tasks;
          update!.splice(res.idx!, 1, res.task);
          this.boardService.updateTask(this.board.id!, this.board.tasks!);
        }
      }
    });
  }
}
