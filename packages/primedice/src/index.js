import { randomInt } from '@provably-fair/core';
import { randomBytes } from 'crypto';

/**
 * Generates a random server seed.
 * @param {number} [size=16] Size of random buffer in bytes.
 * @returns {string} A server seed of the given size.
 */
export function generateServerSeed(size = 16) {
  return randomBytes(size).toString('hex');
}

/**
 * Parses a buffer and tries returning the first unsigned integer which fits the given range.
 * @param {Buffer} buf Buffer to be parsed.
 * @param {number} max Maximum value of output (excluded).
 * @param {number} size Size of parsable chunks in bytes. Must be less than or equal to 6.
 * @param {number} [startOffset=0] Where to start reading the buffer.
 * @returns {number} An unsigned integer parsed from the given buffer. If no appropriate number can
 * be parsed, `NaN` is returned.
 */
export function parseUIntFromBuffer(buf, max, size, startOffset = 0) {
  // No appropriate number can be parsed
  if (startOffset > buf.length - size) return NaN;

  // Parse next number of the buffer and check whether it fits the given range
  const randomValue = Math.floor(
    buf.readUIntBE(
      Math.floor(startOffset),
      Math.ceil(size),
      true,
    ) / (256 ** ((startOffset + size) % 1)),
  ) % (256 ** size);

  return randomValue < max ? randomValue : parseUIntFromBuffer(buf, max, size, startOffset + size);
}

/**
 * Generates a random roll number based on the given seeds.
 * @param {string} serverSeed Server seed used as HMAC key.
 * @param {string} clientSeed Client seed used as HMAC data. To prove fairness of random outputs,
 * the hash of `serverSeed` shall be known before revealing `clientSeed`.
 * @param {number} nonce Number of bets made with the given seed pair (excluding current roll).
 * @returns {number} A number within the range [0.00, 99.99].
 */
export function roll(serverSeed, clientSeed, nonce) {
  const randomValue = randomInt(
    2.5,
    'sha512',
    serverSeed,
    `${clientSeed}-${nonce}`,
    0,
    10 ** 6,
    parseUIntFromBuffer,
    () => (10 ** 6) - 1,
  );

  // Return only the last 4 decimal digits scaled from 0.00 to 99.99
  return (randomValue % (10 ** 4)) / (10 ** 2);
}
