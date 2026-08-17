import { z } from 'zod';
export const opaqueIdSchema = z.string().uuid();
export const requestIdSchema = z.string().uuid();
