import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board/board.service';
import { Board } from '../../kanban/board.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  userBoards : Board[] = []

  constructor(private boardService : BoardService){

  }

  ngOnInit(): void {
  }
}
