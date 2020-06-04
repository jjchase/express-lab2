import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { TodoService } from '../todo.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  showIndex: number = null;
  todos: Todo[] = [];
  constructor(private service: TodoService) { }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.service.getToDos().subscribe(response => {
      this.todos = response;
      console.log(this.todos);
    })
  };


  addTodo(form: NgForm): void {
    console.log(form.value);
    this.service.addToDo(form.value).subscribe(() => {
      this.getAllTodos();
      form.reset();
    })
  }
  deleteTodo(id: number): void {
    this.service.deleteToDo(id).subscribe(() => {
      this.getAllTodos();
    })
  }

  updateTodo(form: NgForm, todo: Todo): void {
    let updatedTodo = todo;
    updatedTodo.task = form.value.task;
    this.service.updateToDo(todo.id, updatedTodo).subscribe(() => {
      this.getAllTodos();
      this.showIndex = null;
    })
  }

  showForm(index: number): void {
    this.showIndex = index;
  }
}
