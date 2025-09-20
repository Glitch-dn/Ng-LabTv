import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

type Theme = 'dark' | 'light';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private doc = inject(DOCUMENT);
  private storageKey = 'theme';

  // Stato reattivo
  private _isDarkMode = new BehaviorSubject<boolean>(this.readInitialTheme());
  readonly isDarkMode$ = this._isDarkMode.asObservable();

  constructor() {
    // Applica subito la classe al body
    this.applyToBody(this._isDarkMode.value ? 'dark' : 'light');
  }

  toggle(): void {
    this.setTheme(this._isDarkMode.value ? 'light' : 'dark');
  }

  setTheme(theme: Theme): void {
    const isDark = theme === 'dark';
    this._isDarkMode.next(isDark);
    this.applyToBody(theme);
    try {
      localStorage.setItem(this.storageKey, theme);
    } catch {
      /* ignore se storage non disponibile */
    }
  }

  // -------- helpers --------
  private readInitialTheme(): boolean {
    try {
      const saved = localStorage.getItem(this.storageKey) as Theme | null;
      if (saved === 'light') return false;
      if (saved === 'dark') return true;
    } catch {}
    return true; // fallback dark
  }

  private applyToBody(theme: Theme): void {
    const body = this.doc?.body;
    if (!body) return;
    if (theme === 'light') {
      body.classList.add('light-theme');
    } else {
      body.classList.remove('light-theme');
    }
  }
}
