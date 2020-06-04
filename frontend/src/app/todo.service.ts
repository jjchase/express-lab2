import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  apiURL: string = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  getToDos(): any {
    return this.http.get(`${this.apiURL}/todo`)
  }
  addToDo(todo: Todo): any {
    return this.http.post(`${this.apiURL}/todo`, todo)
  }
  deleteToDo(id: number): any {
    return this.http.delete(`${this.apiURL}/todo/${id}`)
  }
  updateToDo(id: number, todo: Todo): any {
    return this.http.put(`${this.apiURL}/todo/${id}`, todo)
  }
}