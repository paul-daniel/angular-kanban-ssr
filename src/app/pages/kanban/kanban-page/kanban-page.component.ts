import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardService } from 'src/app/services/board/board.service';
import { Board } from '../board.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-kanban-page',
  templateUrl: './kanban-page.component.html',
  styleUrls: ['./kanban-page.component.scss']
})
export class KanbanPageComponent implements OnInit, OnDestroy{
  boards : Board[];
  sub: Subscription;

  constructor(private boardService: BoardService){
    this.boards = []
    this.sub = new Subscription();
  }

  ngOnInit(): void {
      this.sub = this.boardService.getUserBoard().subscribe({
        next: (boards : Board[]) => {
          this.boards = [...boards]
        },
        error: (error) => console.error(error),
      })
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe 
  }

  drop(event : CdkDragDrop<string[]>){
    moveItemInArray(this.boards,event.previousIndex, event.currentIndex)
    this.boardService.sortBoards(this.boards)
  }
}
