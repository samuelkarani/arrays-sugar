import { deepStrictEqual, strictEqual } from "node:assert";
import { describe, it } from "node:test";
import {
  everyConcurrent,
  everyOptimized,
  everySerial,
  filterConcurrent,
  filterSerial,
  findConcurrent,
  findIndexConcurrent,
  findIndexOptimized,
  findIndexSerial,
  findOptimized,
  findSerial,
  someConcurrent,
  someOptimized,
  someSerial,
} from "./index.js";

describe("Async arrays", () => {
  const array = [1, 7, 3];
  console.log("array:", array);

  it("everySerial", async () => {
    const result = await everySerial(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, false);
  });

  it("everyConcurrent", async () => {
    const result = await everyConcurrent(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, false);
  });

  it("everyOptimized", async () => {
    const result = await everyOptimized(array, async (item) => {
      if (item <= 1) {
        throw new Error("error");
      }
      return true;
    });
    strictEqual(result, false);
  });

  it("filterSerial", async () => {
    const result = await filterSerial(array, async (item) => {
      return item > 1;
    });
    deepStrictEqual(result, [7, 3]);
  });

  it("filterConcurrent", async () => {
    const result = await filterConcurrent(array, async (item) => {
      return item > 1;
    });
    deepStrictEqual(result, [7, 3]);
  });

  it("findSerial", async () => {
    const result = await findSerial(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, 7);
  });

  it("findConcurrent", async () => {
    const result = await findConcurrent(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, 7);
  });

  it("findOptimized", async () => {
    const result = await findOptimized(array, async (item) => {
      if (item <= 1) {
        throw new Error("error");
      }
      return true;
    });
    strictEqual(result, 7);
  });

  it("findIndexSerial", async () => {
    const result = await findIndexSerial(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, 1);
  });

  it("findIndexConcurrent", async () => {
    const result = await findIndexConcurrent(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, 1);
  });

  it("findIndexOptimized", async () => {
    const result = await findIndexOptimized(array, async (item) => {
      if (item <= 1) {
        throw new Error("error");
      }
      return true;
    });
    strictEqual(result, 1);
  });

  it("someSerial", async () => {
    const result = await someSerial(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, true);
  });

  it("someConcurrent", async () => {
    const result = await someConcurrent(array, async (item) => {
      return item > 1;
    });
    strictEqual(result, true);
  });

  it("someOptimized", async () => {
    const result = await someOptimized(array, async (item) => {
      if (item <= 1) {
        throw new Error("error");
      }
      return true;
    });
    strictEqual(result, true);
  });
});
