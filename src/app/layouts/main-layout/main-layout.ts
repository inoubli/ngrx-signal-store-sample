import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  signal,
  computed,
} from '@angular/core';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

import { Header } from '../components/header/header';
import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, Header, Sidebar],
  templateUrl: './main-layout.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayout {
  private breakpoint = inject(BreakpointObserver);

  // 🔹 Responsive signal (no manual subscribe)
  isCompactLayout = toSignal(
    this.breakpoint.observe('(max-width: 1024px)').pipe(map((r) => r.matches)),
    {
      initialValue: false, // Used as initial value for BreakpointState.matches before the first emission from the observable. This ensures that the UI has a defined state on load, preventing potential layout issues or flashes of unstyled content.
    },
  );

  // null = no user override
  private userOverride = signal<boolean | null>(null);

  collapsed = computed(() => {
    return this.userOverride() ?? this.isCompactLayout();
  });

  // 🔹 Auto-collapse on medium screens
  constructor() {
    effect(() => {
      if (!this.isCompactLayout()) {
        this.userOverride.set(null); // reset on large screens
      }
    });
  }

  /**
   * Toggles the sidebar open/closed state on user interaction
   * When child sidebar toggleBurgerClicked is emitted.
   */
  toggleSidebar(): void {
    this.userOverride.update((v) => (v === null ? !this.isCompactLayout() : !v));
  }
}
