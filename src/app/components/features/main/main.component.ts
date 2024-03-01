import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../../core/services/todos.service';
import { FilterEnum } from '../../../core/enums/enum';
import { TodoComponent } from '../../shared/todo/todo.component';
import { IChangeTodo } from 'src/app/core/models/ITodos';
@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [CommonModule, TodoComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  // dalla versione 14 di angular è posibile utilizzare
  // la funazione Inject per iniettare servizi
  todosService = inject(TodosService);
  editingId: string | null = null;

  // grazie a computed possiamo creare un nuovo
  // signal basato su altri signal
  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  });

  isAllTodosSelected = computed(() => {
    this.todosService.todosSig().every((todo) => todo.completed);
  });

  onToggleAllTodos(event: Event): void {
    this.todosService.toggleAllTodos(
      (event.target as HTMLInputElement).checked
    );
  }

  onSetEditingId(editingId: string | null) {
    this.editingId = editingId;
  }

  onChangeTodoText(changedTodo: IChangeTodo) {
    this.todosService.changeTodo(changedTodo.id, changedTodo.text);
  }

  onToggleTodo(id: string) {
    this.todosService.toggleTodo(id);
  }

  onRemoveTodo(id: string) {
    this.todosService.removeTodo(id);
  }
}
