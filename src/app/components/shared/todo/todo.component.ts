import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChangeTodoInterface,
  TodosInterface,
} from '../../../core/models/todos.model';
import { TodosService } from '../../features/services/todos.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: TodosInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() changeTodoText: EventEmitter<ChangeTodoInterface> =
    new EventEmitter();
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('textInput') textInput?: ElementRef;

  // dalla versione 14 di angular è posibile utilizzare
  // la funazione Inject per iniettare servizi
  todosService = inject(TodosService);

  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.title;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 0);
    }
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    // emit evento di modifica del todo
    this.changeTodoText.emit({
      id: this.todo.id,
      text: this.editingText,
    } as ChangeTodoInterface);
    // una volta modificato il todo verà emesso il valore null
    // quindi non ci saranno todo da modificare
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    // verà emesso il valore l'id del todo da modificare
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo() {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo() {
    this.todosService.toggleTodo(this.todo.id);
  }
}
