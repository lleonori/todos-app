import { Injectable, signal } from '@angular/core';
import { TodosInterface } from '../models/todosModel';
import { FilterEnum } from '../enums/enum';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  // dichiarazione del Signal
  todsSig = signal<TodosInterface[]>([]);
  filterSig = signal<FilterEnum>(FilterEnum.all);

  addTodo(text: string): void {
    const newTodo: TodosInterface = {
      id: Math.random().toString(16),
      title: text,
      completed: false,
    };

    // update del Signal
    this.todsSig.update((todos) => [...todos, newTodo]);
  }

  chageFilter(filterName: FilterEnum): void {
    // tramite set non andiamo a modificare il valore
    // del signal ma andiamo a sovrascrivere
    // completamente il valore del nostro signal
    this.filterSig.set(filterName);
  }
}
