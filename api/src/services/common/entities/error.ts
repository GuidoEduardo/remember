import { z } from 'zod';

const ErrorEvent = z.object({
	__typename: z.string().readonly(),
	message: z.string().readonly(),
	payload: z.any().optional().readonly(),
	createdAt: z.date().readonly(),
});

export { ErrorEvent };
