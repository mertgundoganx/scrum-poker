'use client';

import { createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeCtx { theme: Theme; toggle: () => void; }

const ThemeContext = createContext<ThemeCtx>({ theme: 'light', toggle: () => {} });

/** How long the colours cross-fade on a switch (globals.css .theme-switching: 0.22s). */
const FADE_MS = 260;
let fadeTimer: ReturnType<typeof setTimeout> | undefined;

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    return 'light';
  });

  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    try { localStorage.setItem('scrumPoker_theme', next); } catch { /* private mode: this page only */ }
    const root = document.documentElement;
    // A short colour cross-fade, only for a switch the visitor asked for (the first paint
    // gets its theme from SET_THEME, with nothing to fade) and not under reduced motion.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-switching');
      clearTimeout(fadeTimer);
      fadeTimer = setTimeout(() => root.classList.remove('theme-switching'), FADE_MS);
    }
    root.classList.toggle('dark', next === 'dark');
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
