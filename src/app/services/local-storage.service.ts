import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {}

  // saves something to localStorage under a key
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  // gets something back from localStorage
  get(key: string): any {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : null
  }

  // removes one item from localStorage
  remove(key: string) {
    localStorage.removeItem(key)
  }

  // clears everything in localStorage
  clear() {
    localStorage.clear()
  }
}
