export async function everySerial<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  for (const item of array) {
    if (!(await predicate(item))) {
      return false;
    }
  }
  return true;
}

export async function everyConcurrent<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  const settled = await Promise.allSettled(array.map(predicate));
  for (let i = 0; i < settled.length; i++) {
    let item = settled[i] as PromiseSettledResult<boolean>;
    if (item.status === "fulfilled" && !item.value) {
      return false;
    }
  }
  return true;
}

export const every = everyConcurrent;

export async function everyOptimized<T>(
  array: T[],
  predicate: (item: T) => Promise<true>
) {
  try {
    await Promise.all(array.map(predicate));
    return true;
  } catch (error) {
    return false;
  }
}

export async function filterSerial<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  const result: T[] = [];
  for (const item of array) {
    if (await predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

export async function filterConcurrent<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  const settled = await Promise.allSettled(array.map(predicate));
  const result: T[] = [];
  for (let i = 0; i < settled.length; i++) {
    let item = settled[i] as PromiseSettledResult<boolean>;
    if (item.status === "fulfilled" && item.value) {
      result.push(array[i] as T);
    }
  }
  return result;
}

export const filter = filterConcurrent;

export async function findSerial<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  for (const item of array) {
    if (await predicate(item)) {
      return item;
    }
  }
  return undefined;
}

export async function findConcurrent<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  const settled = await Promise.allSettled(array.map(predicate));
  for (let i = 0; i < settled.length; i++) {
    let item = settled[i] as PromiseSettledResult<boolean>;
    if (item.status === "fulfilled" && item.value) {
      return array[i] as T;
    }
  }
  return undefined;
}

export const find = findConcurrent;

export async function findOptimized<T>(
  array: T[],
  predicate: (item: T) => Promise<true>
) {
  try {
    const result = await Promise.any(
      array.map(async (item) => {
        if (await predicate(item)) {
          return item;
        }
      })
    );
    return result;
  } catch (error) {
    return undefined;
  }
}

export async function findIndexSerial<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  for (let i = 0; i < array.length; i++) {
    if (await predicate(array[i] as T)) {
      return i;
    }
  }
  return -1;
}

export async function findIndexConcurrent<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  const settled = await Promise.allSettled(array.map(predicate));
  for (let i = 0; i < settled.length; i++) {
    let item = settled[i] as PromiseSettledResult<boolean>;
    if (item.status === "fulfilled" && item.value) {
      return i;
    }
  }
  return -1;
}

export const findIndex = findIndexConcurrent;

export async function findIndexOptimized<T>(
  array: T[],
  predicate: (item: T) => Promise<true>
) {
  try {
    const result = await Promise.any(
      array.map(async (item, index) => {
        if (await predicate(item)) {
          return index;
        }
      })
    );
    return result;
  } catch (error) {
    return -1;
  }
}

export async function someSerial<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  for (const item of array) {
    if (await predicate(item)) {
      return true;
    }
  }
  return false;
}

export async function someConcurrent<T>(
  array: T[],
  predicate: (item: T) => Promise<boolean>
) {
  const settled = await Promise.allSettled(array.map(predicate));
  for (const item of settled) {
    if (item.status === "fulfilled" && item.value) {
      return true;
    }
  }
  return false;
}

export const some = someConcurrent;

export async function someOptimized<T>(
  array: T[],
  predicate: (item: T) => Promise<true>
) {
  try {
    await Promise.any(array.map(predicate));
    return true;
  } catch (error) {
    return false;
  }
}
