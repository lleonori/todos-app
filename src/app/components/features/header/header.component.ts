import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../../core/services/todos.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  // dalla versione 14 di angular è posibile utilizzare
  // la funazione Inject per iniettare servizi
  todosService = inject(TodosService);
  text: string = '';

  onChangeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.value) {
      this.text = target.value;
    }
  }

  onAddTodo(): void {
    if (this.text) {
      this.todosService.addTodo(this.text);
    }
    this.text = '';
  }
}
