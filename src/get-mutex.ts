import type Mutex from "mutex.js";
import { MutexStore } from "./mutex-store";

const MUTEX_KEY = Symbol();

export interface Atomic {
  [MUTEX_KEY]?: symbol;
}

export function getMutex(obj: Atomic, id?: symbol): Mutex {
  if (id) return MutexStore.getMutex(id);
  if ((id = obj[MUTEX_KEY])) return MutexStore.getMutex(id);

  const newID = Symbol();
  obj[MUTEX_KEY] = newID;

  return MutexStore.getMutex(newID);
}
