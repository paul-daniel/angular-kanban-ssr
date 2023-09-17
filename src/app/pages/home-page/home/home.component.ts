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
      this.boardService.getUserBoard().subscribe(userBoard => {
        this.userBoards = userBoard;
      })
  }

  async createDoc(){
    this.boardService.createBoard({
      title : 'test',
      priority : 1,
      tasks : [
        {label: 'yellow','description': 'test description'}
      ]
  })
  }

  async deleteDoc(boardId : string){
    if(boardId)
      this.boardService.deleteBoard(boardId)
  }

  async updateDoc(boardId : string){
    if(boardId){
      this.boardService.updateTask(boardId, [{label : "blue",description : 'update'}])
    }
  }
}
