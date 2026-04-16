import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { TODOS } from '../models/mock-data';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  async getTodos() {
    await sleep(1000);
    return TODOS;
  }

  async addTodo(todo: Partial<Todo>): Promise<Todo> {
    await sleep(1000);

    return {
      id: Math.random().toString(36).substr(2, 9),
      ...todo,
    } as Todo;
  }

  async updateTodo(id: string, updates: Partial<Todo>): Promise<Todo> {
    await sleep(1000);
    const index = TODOS.findIndex((t) => t.id === id);
    if (index !== -1) {
      TODOS[index] = { ...TODOS[index], ...updates };
    }
    return TODOS[index];
  }

  async deleteTodo(id: string) {
    await sleep(1000);
    const index = TODOS.findIndex((t) => t.id === id);
    if (index !== -1) {
      TODOS.splice(index, 1);
    }
  }
}
/** Used to simulate a delay */
async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
