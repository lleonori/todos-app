import { CommonModule } from '@angular/common';
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
} from '@angular/core';
import { IChangeTodo, ITodos } from '../../../core/models/ITodos';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: ITodos;
  @Input({ required: true }) isEditing!: boolean;

  @Output() changeTodoText: EventEmitter<IChangeTodo> = new EventEmitter();
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @Output() removeTodo: EventEmitter<string | null> = new EventEmitter();
  @Output() toggleTodo: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput') textInput?: ElementRef;

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

  onChangeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  onChangeTodo(): void {
    // emit evento di modifica del todo
    this.changeTodoText.emit({
      id: this.todo.id,
      text: this.editingText,
    } as IChangeTodo);
    // una volta modificato il todo verà emesso il valore null
    // quindi non ci saranno todo da modificare
    this.setEditingId.emit(null);
  }

  onSetTodoInEditMode(): void {
    // verà emesso il valore l'id del todo da modificare
    this.setEditingId.emit(this.todo.id);
  }

  onToggleTodo() {
    this.toggleTodo.emit(this.todo.id);
  }

  onRemoveTodo() {
    this.removeTodo.emit(this.todo.id);
  }
}
