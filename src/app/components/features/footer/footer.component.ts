import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../services/todos.service';
import { FilterEnum } from '../enums/enum';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  // dalla versione 14 di angular è posibile utilizzare
  // la funazione Inject per iniettare servizi
  todosService = inject(TodosService);

  // in questo modo salviamo il valore del signal
  // all'interno di una variabile rendendolo statico
  // se cambia il valore del signal non siamo reattivi
  // filter = this.todosService.filterSig();
  filterSig = this.todosService.filterSig;

  noTodosClass = computed(() => {
    const todos = this.todosService.todsSig();
    return todos.length === 0;
  });

  itemsLeftText = computed(() => {
    return `item${this.activeCount() !== 1 ? 's' : ''} left`;
  });

  activeCount = computed(() => {
    const todos = this.todosService.todsSig();
    return todos.filter((todo) => !todo.completed).length;
  });

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.chageFilter(filterName);
  }

  get filterEnum() {
    return FilterEnum;
  }
}
