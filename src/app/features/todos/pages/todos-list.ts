import { afterNextRender, Component, effect, inject, OnInit, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule, MatSelectionListChange } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'todos-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatListModule,
    MatProgressSpinner,
  ],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList implements OnInit {
  todosStore = inject(TodosStore);

  /** filter Signal from <mat-button-toggle-group>
   * Added required since we know it should be present
   */
  filter = viewChild.required(MatButtonToggleGroup); // No need for template tag like:  #filterRef

  constructor() {
    // Wait for the first DOM rendering cycle, otherwise the ViewChild reference will not be available
    afterNextRender(() => {
      effect(() => {
        const filterButton = this.filter();
        filterButton.value = this.todosStore.filter();
      });
    });
  }

  ngOnInit() {
    console.log('TodosList initialized');
    this.loadTodos().then(() => console.log('Todos loaded!'));
  }

  async loadTodos() {
    await this.todosStore.loadAll();
  }

  onAddTodo(title: string): void {
    const todo: Todo = { id: Date.now().toString(), title, completed: false };
    this.todosStore.addTodo(todo);
  }

  onDeleteTodo(event: MouseEvent, id: string): void {
    event.stopPropagation();
    this.todosStore.deleteTodo(id);
  }

  onToggleTodoCompletion(event: MatSelectionListChange): void {
    const { selected, value } = event.options[0];
    this.todosStore.updateTodo({ id: value, updates: { completed: selected } });
  }

  onFilterTodos(filter: TodosFilter) {
    this.todosStore.updateFilter(filter);
  }
}
