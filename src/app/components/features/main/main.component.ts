import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../services/todos.service';
import { FilterEnum } from '../enums/enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-main',
  standalone: true,
  templateUrl: './main.component.html',
  imports: [CommonModule, TodoComponent],
})
export class MainComponent {
  // dalla versione 14 di angular è posibile utilizzare
  // la funazione Inject per iniettare servizi
  todosService = inject(TodosService);
  editingId: string | null = null;

  // grazie a computed possiamo creare un nuovo
  // signal basato su altri signal
  visibleTodos = computed(() => {
    const todos = this.todosService.todsSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.completed);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.completed);
    }
    return todos;
  });

  setEditingId(editingId: string | null) {
    debugger;
    this.editingId = editingId;
  }
}
