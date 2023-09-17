import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';
import { Board } from 'src/app/pages/kanban/board.model';
import { BoardService } from 'src/app/services/board/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board !: Board;

  constructor(private boardService: BoardService){
    this.board
  }

  taskDrop(event : CdkDragDrop<string[]>){
    if(!this.board.tasks || !this.board.id) return;
    
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex)
    this.boardService.updateTask(this.board.id, this.board.tasks)
  }
}
