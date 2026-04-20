import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  styleUrls: ['./app.scss'],
  template: `
    <div class="app">
      <router-outlet />
    </div>
  `,
  imports: [RouterOutlet],
})
export class App {}
