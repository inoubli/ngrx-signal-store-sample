import { computed, inject } from '@angular/core';
import { Todo } from '../model/todo.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { TodosService } from '../services/todos.service';

export type TodosFilter = 'all' | 'pending' | 'completed';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  filter: TodosFilter;
}

const initialTodosState: TodosState = {
  todos: [],
  loading: false,
  filter: 'all',
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialTodosState),
  withMethods((store, todosService = inject(TodosService)) => ({
    /** Each function is a behavior of the Store */
    async loadAll() {
      patchState(store, { loading: true });
      const todos = await todosService.getTodos();
      patchState(store, { todos, loading: false });
    },

    async addTodo(todo: Partial<Todo>) {
      patchState(store, { loading: true });
      const newTodo = await todosService.addTodo(todo);
      patchState(store, (state) => ({ todos: [...state.todos, newTodo], loading: false }));
    },

    async deleteTodo(id: string) {
      await todosService.deleteTodo(id);
      patchState(store, (state) => ({ todos: state.todos.filter((todo) => todo.id !== id) }));
    },

    async updateTodo(id: string, updates: Partial<Todo>) {
      const updatedTodo = await todosService.updateTodo(id, updates);
      patchState(store, (state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? { ...todo, ...updatedTodo } : todo)),
      }));
    },

    updateFilter(filter: TodosFilter) {
      patchState(store, { filter });
    },
  })),
  withComputed((state) => ({
    filteredTodos: computed(() => {
      const { todos, filter } = state; // Returns store properties assignals
      switch (filter()) {
        case 'all':
          return todos();
        case 'completed':
          return todos().filter((todo) => todo.completed);
        case 'pending':
          return todos().filter((todo) => !todo.completed);
      }
    }),
  })),
);

/** Every Store Property is returned as a Signal */
