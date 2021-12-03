import type { Atomic } from "./get-mutex";
import { getMutex } from "./get-mutex";

export function atomic(id?: symbol) {
  return <K extends string>(proto: Record<K, Function>, key: K): any => {
    const implementation = proto[key];

    proto[key] = async function (this: Atomic, ...args: any[]) {
      const mutex = getMutex(this, id);

      await mutex.acquire();

      try {
        const result = await implementation.bind(this)(...args);
        return result;
      } finally {
        mutex.release();
      }
    };

    return proto;
  };
}
