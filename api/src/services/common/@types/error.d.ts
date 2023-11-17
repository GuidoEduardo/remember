import { z } from 'zod';
import { ErrorEvent } from '../entities/error';

type ErrorEvent = z.infer<typeof ErrorEvent>;
