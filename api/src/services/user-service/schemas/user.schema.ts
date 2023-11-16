import { z } from 'zod';
import validator from 'validator';

const id = z.string().uuid().readonly().optional();

const username = z
	.string()
	.refine(arg => !arg.includes(' ') && !validator.isEmpty(arg), {
		message: 'invalid username',
	});

const email = z
	.string()
	.email();

const firstName = z.string().refine(arg => !validator.isEmpty(arg), { message: 'first name required'})

const lastName = z.string().refine(arg => !validator.isEmpty(arg), { message: 'last name required'})

const createdAt = z.date().optional()
const updatedAt = z.date().optional()

export const UserSchema = z.object({
	id,
	username,
	email,
	firstName,
	lastName,
	createdAt,
	updatedAt
})

export const UsersSchema = z.array(UserSchema);
