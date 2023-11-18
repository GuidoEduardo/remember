import { Prisma, PrismaClient } from "@prisma/client";
import { InvalidFieldError, UniqueFieldError, UnknownError } from "../../../../services/common/exceptions";
import { MutableRepository } from "../../../../services/common/repository";

export abstract class MutableRepositoryImpl<T> implements MutableRepository<T> {
	protected client: PrismaClient

	contructor(client: PrismaClient) {
		this.client = client;
	}

	abstract create(data: T): Promise<T>;

	abstract get(externalId: UUID): Promise<T | void>;

	abstract getAll(): Promise<T[]>;

	abstract find(filter: object): Promise<T[]>;

	abstract update(externalId: UUID, data: object): Promise<T>;

	abstract delete(externalId: UUID): Promise<void>;

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
