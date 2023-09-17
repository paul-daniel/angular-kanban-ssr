import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { CollectionReference, DocumentData, collection, addDoc, orderBy, query, where,deleteDoc, doc, arrayRemove, updateDoc, writeBatch } from 'firebase/firestore';
import { authState, Auth, User } from '@angular/fire/auth';

import { Board, Task } from 'src/app/pages/kanban/board.model';
import { SnackService } from '../snack/snack.service';
import { Observable, catchError, of, switchMap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BoardService {
  authState$ : Observable<User | null>;
  boardCollectionRef : CollectionReference<DocumentData>; 

  constructor(private auth : Auth, private db: Firestore, private snackbar : SnackService) { 
    this.boardCollectionRef = collection(this.db, 'boards');
    this.authState$ = authState(this.auth as any);
  }

  /**
   * Create a new board in Firestore database
   * 
   * @param {string} board board to create
   * @returns {Promise<DocumentReference<DocumentData, DocumentData>>} ref of the new board
   */
  createBoard(board: Board){
    try {
      const user = this.auth.currentUser;
    
      if(!user || !this.boardCollectionRef) return
      const docRef = addDoc(this.boardCollectionRef, {
              ...board,
              uid: user.uid,
              tasks: [{description : 'Hello!', label: 'yellow' }]
      })
      return docRef;
    } catch (error) {
      console.error(error);
      throw new Error("Could not create board");
    }
  }

  /**
   * Delete a board
   * @param {string} boardId Id of the board to delete
   * @returns {boolean} true if board was deleted
   */
  async deleteBoard(boardId : string) {
    try {
      const user = this.auth.currentUser;
      if(!user){
        this.snackbar.authError()
        return;
      }
      const docRef = doc(this.db, 'boards', boardId)
      await deleteDoc(docRef)
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Could not delete board");
    }
  }

  /**
   * Updates the board
   */
  async updateTask(boardId : string, tasks : Task[]) {
    try {
      const user = this.auth.currentUser;
      if(!user){
        this.snackbar.authError()
        return;
      }
      const docRef = doc(this.db, 'boards', boardId)
      await updateDoc(docRef, {tasks})
      return true;
    } catch (error) {
      console.error(error);
      throw new Error("Could not update board");
    }
  }

  /**
   * get User boards
   * @returns {Observable<(DocumentData | (DocumentData & {}))[] | Board[]>} observable sequence of boards
   */
  getUserBoard() : Observable<(DocumentData | (DocumentData & {}))[] | Board[]>{
    return this.authState$.pipe(
      switchMap(user => {
        if(user){
          const userBoard = query(this.boardCollectionRef, where('uid', '==', user.uid), orderBy('priority'))
          const data$ = collectionData(userBoard, {idField : 'id'})
          return data$
        }else{
          return of<Board[]>([])
        }
      }),
      catchError(error => throwError(() => error))
    )
  }

  /**
   * Sort the board collection by priority
   * @param {Board[]} boards board collection
   */
  sortBoards(boards: Board[]) {
    const batch = writeBatch(this.db as any);

    boards.forEach((board, index) => {
      const boardRef = doc(this.boardCollectionRef, board.id);
      batch.update(boardRef, { priority: index });
    });

    batch.commit().then(() => {
      console.log("Successfully updated priorities.");
    }).catch((error) => {
      console.error("Error updating priorities: ", error);
      throw new Error(error)
    });
  }

}
