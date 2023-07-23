import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosInterface } from '../models/todosModel';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit {
  @Input({ required: true }) todo!: TodosInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.title;
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    debugger;
    this.setEditingId.emit(this.todo.id);
  }
}
