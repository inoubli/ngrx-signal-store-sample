import { Routes } from '@angular/router';
import { TodosList } from './pages/todos-list';

export const TODOS_ROUTES: Routes = [
  {
    path: '',
    component: TodosList,
    title: 'Todo List',
  },
];
