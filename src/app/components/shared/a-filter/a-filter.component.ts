import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../features/services/todos.service';
import { FilterEnum } from 'src/app/core/enums/enum';

@Component({
  selector: 'app-a-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './a-filter.component.html',
})
export class AFilterComponent {
  @Input() textFilter: string = '';
  @Input()
  typeFilter: FilterEnum = FilterEnum.all;
  // dalla versione 14 di angular è posibile utilizzare
  // la funazione Inject per iniettare servizi
  todosService = inject(TodosService);

  // in questo modo salviamo il valore del signal
  // all'interno di una variabile rendendolo statico
  // se cambia il valore del signal non siamo reattivi
  // filter = this.todosService.filterSig();
  filterSig = this.todosService.filterSig;

  changeFilter(event: Event, filterName: FilterEnum): void {
    event.preventDefault();
    this.todosService.chageFilter(filterName);
  }

  get filterEnum() {
    return FilterEnum;
  }
}
