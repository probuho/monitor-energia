/// <reference types="vite/client" />

declare global {
  interface Window {
    global: typeof globalThis;
  }
}

window.global = window.global || window;
