import { Component, effect, inject, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { TodosFilter, TodosStore } from '../store/todos.store';
import { Todo } from '../models/todo.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'todos-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatListModule,
  ],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss',
})
export class TodosList {
  todosStore = inject(TodosStore);

  /** filter Signal from <mat-button-toggle-group>
   * Added required since we know it should be present
   */
  filter = viewChild.required(MatButtonToggleGroup); // No need for template tag like:  #filterRef
  // OR with #filterRef: filter = viewChild.required<MatButtonToggleGroup>('filterRef');

  constructor() {
    effect(() => {
      const filterButton = this.filter();
      filterButton.value = this.todosStore.filter();
    });
  }

  async onAddTodo(title: string): Promise<void> {
    const todo: Todo = { id: Date.now().toString(), title, completed: false };
    await this.todosStore.addTodo(todo);
  }

  async onDeleteTodo(event: MouseEvent, id: string): Promise<void> {
    event.stopPropagation();
    await this.todosStore.deleteTodo(id);
  }

  async onToggleTodoCompletion(id: string, isCompleted: boolean): Promise<void> {
    await this.todosStore.updateTodo(id, { completed: isCompleted });
  }

  onFilterTodos(filter: TodosFilter) {
    this.todosStore.updateFilter(filter);
  }
}
