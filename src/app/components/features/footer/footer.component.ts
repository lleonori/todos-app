import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../../core/services/todos.service';
import { FilterEnum } from '../../../core/enums/enum';
import { AFilterComponent } from '../../shared/a-filter/a-filter.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  imports: [CommonModule, AFilterComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  todosService = inject(TodosService);

  // in questo modo salviamo il valore del signal
  // all'interno di una variabile rendendolo statico
  // se cambia il valore del signal non siamo reattivi
  // filter = this.todosService.filterSig();
  filterSig = this.todosService.filterSig;

  itemsLeftText = computed(() => {
    return `item${this.activeCount() !== 1 ? 's' : ''} left`;
  });

  activeCount = computed(() => {
    const todos = this.todosService.todosSig();
    return todos.filter((todo) => !todo.completed).length;
  });

  onChangeFilter(filterName: FilterEnum): void {
    this.todosService.chageFilter(filterName);
  }

  get filterEnum() {
    return FilterEnum;
  }
}
