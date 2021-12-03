import Mutex from "mutex.js";

export class MutexStore {
  private static readonly mutexMap = new Map<symbol, Mutex>();

  private static createMutex(id: symbol): Mutex {
    const mutex = new Mutex();

    this.mutexMap.set(id, mutex);

    return mutex;
  }

  static getMutex(id: symbol): Mutex {
    const mutex = this.mutexMap.get(id);

    if (mutex) return mutex;

    return this.createMutex(id);
  }
}
