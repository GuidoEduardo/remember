import { ErrorEvent as ErrorEventType } from '../@types/error';
import { ErrorEvent } from '../entities/error';
import { Controller } from '../controller';
import { Repository } from '../repository';
import { InvalidFieldError, NotFoundError, UniqueFieldError, UnknownError } from '../exceptions';
import { ZodError } from 'zod';

export abstract class ControllerImpl<T> implements Controller<T, ErrorEventType> {
	abstract repository: Repository<T>;

	abstract create(data: object): Promise<object | ErrorEventType>;

	abstract get(externalId: UUID): Promise<object | ErrorEventType>;

	abstract getAll(): Promise<object | ErrorEventType>;

	abstract find(filter: object): Promise<object | ErrorEventType>;

	static handleError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (...args: any[]) {
			try {
				return await originalMethod.apply(this, args);
			} catch (err) {
				if (err instanceof UniqueFieldError) {
					return ErrorEvent.parse({
						__typename: UniqueFieldError.name,
						message: err.message,
						payload: [
							{
								path: err.getFields,
							},
						],
						createdAt: new Date(),
					});
				} else if (err instanceof InvalidFieldError) {
					return ErrorEvent.parse({
						__typename: InvalidFieldError.name,
						message: err.message,
						createdAt: new Date(),
					});
				} else if (err instanceof ZodError) {
					return ErrorEvent.parse({
						__typename: 'ValidationError',
						message: 'Invalid field inserted',
						payload: err.issues,
						createdAt: new Date(),
					});
				} else if (err instanceof NotFoundError) {
					return ErrorEvent.parse({
						__typename: NotFoundError.name,
						message: err.message,
						createdAt: new Date(),
					});
				} else {
					return ErrorEvent.parse({
						__typename: UnknownError.name,
						message: `${err}`,
						createdAt: new Date(),
					});
				}
			}
		};

		return descriptor;
	}
}
