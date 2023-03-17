type StorageItemType = {
    [key: string]: string;
}

// tsconfig의 isolatedModules 에러가 발생하여 export로 설정.
export class SessionStorageMock {
    store: StorageItemType;

    constructor() {
        this.store = {};
    }
  
    clear() {
        this.store = {};
    }
  
    getItem(key: string) {
        return this.store[key] || null;
    }
  
    setItem(key: string, value: string) {
        this.store[key] = value;
    }
  
    removeItem(key: string) {
        delete this.store[key];
    }
}

Object.defineProperty(window, 'sessionStorage', { value: new SessionStorageMock() });