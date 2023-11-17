import { z } from "zod";

const __typename = z.string();

const message = z.string();

const payload = z.any().optional();

const ErrorSchema = z.object({
	__typename,
	message,
	payload
});

type ErrorData = z.infer<typeof ErrorSchema>;

export { ErrorSchema, ErrorData };
