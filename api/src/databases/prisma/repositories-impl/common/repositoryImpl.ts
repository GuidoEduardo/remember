import { Prisma } from "@prisma/client";
import { InvalidFieldError, UniqueFieldError, UnknownError } from "../../../../services/common/exceptions";
import { Repository } from "../../../../services/common/repository";

export abstract class RepositoryImpl<T> implements Repository<T> {
	abstract create(object: T): Promise<T>;

	abstract get(externalId: UUID): Promise<T | void>;

	abstract getAll(): Promise<T[]>;

	abstract find(filter: object): Promise<T[]>;

	static handleError(target: any, key: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function(this: any, ...args: any[]) {
			try {
				return await originalMethod.apply(this, args);

			} catch(err) {
				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					throw new UniqueFieldError(
						(err.meta as Record<string, string[]>).target,
						'Unique constraint failed on the fields',
					);
				} else if (err instanceof Prisma.PrismaClientValidationError) {
					throw new InvalidFieldError(`Invalid fields inserted: ${err}`);
				} else {
					throw new UnknownError(`Unknown error: ${err}`);
				}
			}
		}

		return descriptor;
	}
}