import { computed, inject } from '@angular/core';
import { Todo } from '../models/todo.model';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { TodosApi } from '../data-access/todos.api';
import { pipe, switchMap, tap } from 'rxjs';

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
  withMethods((store, todosApi = inject(TodosApi)) => ({
    /** Each function is a behavior of the Store */
    loadAll: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap(() => todosApi.getTodos()),
        tap({
          next: (todos) => patchState(store, { todos, loading: false }),
          error: () => patchState(store, { loading: false }),
        }),
      ),
    ),

    addTodo: rxMethod<Partial<Todo>>(
      pipe(
        tap(() => patchState(store, { loading: true })),
        switchMap((todo) => todosApi.addTodo(todo)),
        tap({
          next: (newTodo) =>
            patchState(store, (state) => ({ todos: [...state.todos, newTodo], loading: false })),
          error: () => patchState(store, { loading: false }),
        }),
      ),
    ),

    deleteTodo: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { loading: true })),

        switchMap((id) =>
          todosApi.deleteTodo(id).pipe(
            tap({
              next: () => {
                patchState(store, (state) => ({
                  todos: state.todos.filter((todo) => todo.id !== id),
                  loading: false,
                }));
              },
              error: () => patchState(store, { loading: false }),
            }),
          ),
        ),
      ),
    ),

    updateTodo: rxMethod<{ id: string; updates: Partial<Todo> }>(
      pipe(
        // tap(() => patchState(store, { loading: true })),
        switchMap(({ id, updates }) => todosApi.updateTodo(id, updates)),
        tap({
          next: (updatedTodo) => {
            console.log('Updated todo from API:', updatedTodo);
            patchState(store, (state) => ({
              todos: state.todos.map((todo) =>
                todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo,
              ),
              // loading: false,
            }));
          },
          error: () => patchState(store, { loading: false }),
        }),
      ),
    ),

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
