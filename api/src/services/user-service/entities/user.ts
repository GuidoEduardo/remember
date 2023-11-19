import { z } from 'zod';
import validator from 'validator';

const User = z.object({
	externalId: z.string().uuid().readonly().optional(),
	username: z
		.string()
		.min(2)
		.max(32)
		.toLowerCase()
		.refine((arg) => !arg.includes(' ') && !validator.isEmpty(arg), {
			message: 'invalid username',
		}),
	email: z.string().email(),
	firstName: z
		.string()
		.min(2)
		.max(32)
		.refine((arg) => !validator.isEmpty(arg), { message: 'first name required' }),
	lastName: z
		.string()
		.min(2)
		.refine((arg) => !validator.isEmpty(arg), { message: 'last name required' }),
	createdAt: z.date().readonly().optional(),
	updatedAt: z.date().readonly().optional(),
});

const Users = z.array(User);

export { User, Users };
