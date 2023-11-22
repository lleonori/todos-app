import { Injectable, computed, signal } from '@angular/core';
import { ITodos } from '../models/ITodos';
import { FilterEnum } from '../enums/enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  // dichiarazione del Signal
  todosSig = signal<ITodos[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  noTodosClass = computed(() => {
    const todos = this.todosSig();
    return todos.length === 0;
  });

  addTodo(text: string): void {
    const newTodo: ITodos = {
      id: Math.random().toString(16),
      title: text,
      completed: false,
    };

    // update del Signal
    this.todosSig.update((todos) => [...todos, newTodo]);
  }

  removeTodo(id: string | undefined): void {
    // update del Signal
    this.todosSig.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  chageFilter(filterName: FilterEnum): void {
    // tramite set non andiamo a modificare il valore
    // del signal ma andiamo a sovrascrivere
    // completamente il valore del nostro signal
    this.filterSig.set(filterName);
  }

  changeTodo(id: string | undefined, title: string) {
    // update del Signal
    this.todosSig.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
    );
  }

  toggleTodo(id: string | undefined) {
    // update del Signal
    this.todosSig.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  toggleAllTodos(isCompleted: boolean) {
    // update del Signal
    this.todosSig.update((todos) =>
      todos.map((todo) => ({ ...todo, completed: isCompleted }))
    );
  }
}
