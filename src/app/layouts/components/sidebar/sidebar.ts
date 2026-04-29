import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MenuItem } from './sidebar.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'main-sidebar',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  // 🔹 Fully controlled from parent
  collapsed = input.required<boolean>();

  // 🔹 Emit intent only
  toggleBurgerClicked = output<void>();

  items: MenuItem[] = [
    { label: 'Home', icon: 'home', route: '/home' },
    { label: 'Todos', icon: 'list', route: '/todos' },
    { label: 'Auth', icon: 'login', route: '/auth' },
  ];
}
