import { Component } from '@angular/core';
import { TodosComponent } from './components/features/todos/todos.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [TodosComponent],
})
export class AppComponent {
  title = 'todos-app';
}
