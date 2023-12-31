/* создали сервис для localStorage, чтобы он проверял, находитесь ли вы внутри браузера, а затем добавлял содержимое в localstorage. Необходим если вы согласились вначале на создание проекта с использованием SSR (Server Side Rendering) */

import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService implements Storage {
  get storage() {
    return isPlatformBrowser(this.platformId) ? localStorage : null;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  [name: string]: any;
  length: number = 0;

  clear(): void {
    this.storage?.clear();
  }
  getItem(key: string): string | null {
    return this.storage?.getItem(key) ?? null;
  }
  key(index: number): string | null {
    return this.storage?.key(index) ?? null;
  }
  removeItem(key: string): void {
    this.storage?.removeItem(key);
  }
  setItem(key: string, value: string): void {
    this.storage?.setItem(key, value);
  }
}
