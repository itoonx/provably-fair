# @provably-fair/core

Generic purpose tools for creating and verifying provably fair games.

[![Version (npm)](https://img.shields.io/npm/v/@provably-fair/core.svg)](https://www.npmjs.com/package/@provably-fair/core)

## API Reference

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### parseRandomUInt

Parses a buffer and tries returning the first unsigned integer which fits the given range.

**Parameters**

-   `buf` **[Buffer](https://nodejs.org/api/buffer.html)** Buffer to be parsed.
-   `max` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Maximum value of output (excluded).
-   `size` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Size of parsable chunks in bytes. Must be less than or equal to 6.
-   `startOffset` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Where to start reading the buffer. (optional, default `0`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** An integer number parsed from the given buffer. If no appropriate number can be
parsed, `NaN` is returned.

### randomInt

Generates a random integer based on the given seeds, using the given HMAC algorithm.

**Parameters**

-   `size` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Size of output in bytes. Must be less than or equal to 6.
-   `hmacAlgorithm` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Hash algorithm used for computing the HMAC of the given seed pair.
-   `secretSeed` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Buffer](https://nodejs.org/api/buffer.html))** Secret seed used as HMAC key.
-   `publicSeed` **([string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) \| [Buffer](https://nodejs.org/api/buffer.html))?** Public seed used as HMAC data. To prove fairness of random
    outputs, the hash of `secretSeed` shall be known before revealing `publicSeed`.
-   `min` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Minimum value of output (included). (optional, default `0`)
-   `max` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** Maximum value of output (excluded). (optional, default `256**size`)
-   `randomUIntParser` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** Function to be used for parsing a random
    UInt from the generated HMAC buffer. (optional, default `parseRandomUInt`)
-   `fallbackProvider` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)?** Function to provide a
    fallback value in the given range whether no appropriate number can be parsed. (optional, default `range`)

Returns **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** An integer within the given range.