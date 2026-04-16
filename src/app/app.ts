import { Component, inject, OnInit } from '@angular/core';
import { TodosStore } from './features/todos/store/todos.store';
import { TodosList } from './features/todos/pages/todos-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
  imports: [MatProgressSpinnerModule, TodosList],
})
export class App implements OnInit {
  store = inject(TodosStore);

  ngOnInit() {
    this.loadTodos().then(() => console.log('Todos loaded!'));
  }

  async loadTodos() {
    await this.store.loadAll();
  }
}
