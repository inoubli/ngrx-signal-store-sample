import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'main-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {}
