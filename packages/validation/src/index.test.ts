import { describe, expect, it } from 'vitest';
import { opaqueIdSchema } from './index.js';

describe('opaque identifiers', () => {
  it('accepts UUIDs and rejects human-readable identifiers', () => {
    expect(
      opaqueIdSchema.safeParse('f49a1a12-4377-4b96-b49f-735b64f950aa').success,
    ).toBe(true);
    expect(opaqueIdSchema.safeParse('alex-example-diagnosis').success).toBe(
      false,
    );
  });
});
