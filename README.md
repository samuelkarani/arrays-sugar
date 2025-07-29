# arrays sugar

## What's this package?

Async versions of array functions with predicate callbacks e.g.

```
import { findIndex } from 'arrays-sugar'

const array = [1, 2, 3];
findIndex(array, async (number) => number === 2) // 1 ✅
array.findIndex(async (number) => number === 2) // 0 ❌
```

Built with Typescript for Node.js or the Browser.

<!-- ### 🎉 Become a sponsor -->
<!-- ### 🎉 Become a patreon -->

### ☕ [Buying me a coffee](https://github.com/sponsors/samuelkarani) supports the project 🎉

## What's in it?

A set of purely functional array methods with async predicates: `every`, `filter`, `find`, `findIndex`, `some`

These are used internally in the related **[AI Sugar](https://github.com/samuelkarani/ai-sugar)** package/library. Check it out especially if you're building or working with AI in Typescript/Node.js.

So each function has 2/3 versions:

- default version which is concurrent (uses `Promise.allSettled` internally) and is also available with the suffix `Concurrent`

```
   // both are equivalent
   [1, 2, 3].every(async (number) => number === 2) === true
   [1, 2, 3].everyConcurrent(async (number) => number === 2) === true
```

- optimized version that may not iterate the entire array on condition that the predicate `throws` for `falsy` values (instead of returning `false`). This is available for all except `filter` which has to go through the whole array. Uses the suffix `Optimized`.

```
    const result = await findOptimized(array, async (item) => {
      if (item <= 1) {
        throw new Error("error");
      }
      return true;
    });
```

- serial version that iterates one at a time (slow). Uses the suffix `Serial`.

```
    const result = await findIndexSerial(array, async (item) => {
      await sleep(100);
      return item > 1;
    });
```

## Why?

Using callbacks with promises or async/await inside findIndex always returns truthy for all items in the array.

If you try this in the console or node.js it will always return `false`

`[1, 2, 3].findIndex(async (number) => number === 2) === 1`

The same goes for `every`, `find`, `filter`, `some`

Outside `map` it seems only `reduce` can work with `promise` or `async`/`await` callbacks

<!-- Because most array functions with callbacks can't work with `promises` or `async`/`await` -->

```
const sum = await [1, 2, 3].reduce((accumulator, number) => {
  return accumulator.then(value => value + number)
}, Promise.resolve(0));
console.log(sum) // 6
```

### Coming soon

Async versions of:

1. `indexOf`
2. `lastIndexOf`
3. `findLast`
4. `findLastIndex`

## That's it!

Thanks for reading.
I welcome your input, suggestions, feedback. Here is the [medium article](https://medium.com/@samiezkay/8d70198ffc72) I wrote introducing this library.

Check out the following related libraries that I also built with this release.

[ai-sugar](https://github.com/samuelkarani/ai-sugar) AI Sugar is a collection of utility functions for working with AI apis.

```
const sorted = await ai.sort({
  array: ["green", "red", "blue", "yellow"],
  prompt: "rainbow color order",
});
// ["red", "yellow", "green", "blue"]
```

[zod-sugar](https://github.com/samuelkarani/zod-sugar) Zod Sugar is basically reverse zod i.e. creates a zod schema from a javascript value:

```
const object = { foo: "bar", baz: 1 };
const schema = createZod(object);
// z.object({ foo: z.string(), bar: z.number() });
schema.safeParse(object).success // true
```

## [Become a sponsor - starting 5$](https://github.com/sponsors/samuelkarani)

Support us if you would like this work to continue! You can contribute on either on [Github Sponsors](https://github.com/sponsors/samuelkarani) or [Patreon](https://patreon.com/samuelkarani) or [BuyMeACoffee](https://coff.ee/samuelkarani) - once or monthly. Sponsorship allows development and maintenance of all 3 sugar libraries i.e. [ai-sugar](https://github.com/samuelkarani/ai-sugar), [arrays-sugar](https://github.com/samuelkarani/arays-sugar) and [zod-sugar](https://github.com/samuelkarani/zod-sugar).

<!-- You can become a sponsor at whatever amount you are comfortable with.

- For individuals, starting $5 monthly or a one-time payment.
- For companies, starting $100 monthly or a one-time payment.

As a sponsor you can have yours or your organization's name or photo featured in our upcoming sponsors list tiers.
The list tiers will be updated every month to reflect the total contributions for every individual and company. -->

<!-- Additionally each person & company gets 144 characters to promote anything they would want. -->

## Where you can find me

You can reach me via email at samuel.karani@berkeley.edu

I occasionally inhabit Twitter https://x.com/samuel_karani

<!-- I also have an [Instagram](https://www.instagram.com/samiezkay) -->

## What I'm building

[![Similarly logo](similarly.png)](https://chromewebstore.google.com/detail/similarsites+-discover-al/dhahadpjpmphckgebnikgpdhaolcojdg)

Find the best alternatives with one click. Discover similar websites, tools and services instantly while browsing. Never miss out on better options again.
[Check out Similarly](https://chromewebstore.google.com/detail/similarsites+-discover-al/dhahadpjpmphckgebnikgpdhaolcojdg)

<!-- I am also a co-founder at PollGPT and we're currently on the lookout for investors - reach out if you're interested in building the future of research with AI. -->
