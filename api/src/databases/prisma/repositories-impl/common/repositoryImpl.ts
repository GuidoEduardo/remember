import { Prisma, PrismaClient, PrismaPromise } from '@prisma/client';
import { InvalidFieldError, UniqueFieldError, UnknownError } from '../../../../services/common/exceptions';
import { Repository } from '../../../../services/common/repository';
import { Request } from '../../../../services/common/@types/graphql';
import { GenericResults } from '../../../../services/common/@types/repository';

export abstract class RepositoryImpl<T> implements Repository<T> {
	protected client: PrismaClient;

	contructor(client: PrismaClient) {
		this.client = client;
	}

	abstract create(object: T): Promise<T>;

	abstract createMany(data: T[]): Promise<number>;

	abstract get(externalId: UUID): Promise<T | void>;

	abstract getAll(options: Request): Promise<GenericResults<T>>;

	abstract find(options: Request, filter: object): Promise<GenericResults<T>>;

	static handleError(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
		const originalMethod = descriptor.value;

		descriptor.value = async function (this: any, ...args: any[]) {
			try {
				return await originalMethod.apply(this, args);
			} catch (err) {
				console.error(`${typeof err} ${err}`);

				if (err instanceof Prisma.PrismaClientKnownRequestError) {
					throw new UniqueFieldError((err.meta as Record<string, string[]>).target, `Unique Field failed. ${err}`);
				} else if (err instanceof Prisma.PrismaClientValidationError) {
					throw new InvalidFieldError(`Invalid fields inserted: ${err}`);
				} else {
					throw new UnknownError(`Unknown error: ${err}`);
				}
			}
		};

		return descriptor;
	}

	async batch(queries: PrismaPromise<any>[], chunkSize: number = 10000): Promise<number> {
		const start = new Date();

		let count = 0;
		let currentChunk = 0;
		let transactionsCount = 1;

		let transactions: PrismaPromise<any>[][] = [];

		for (let query of queries) {
			if (!transactions[currentChunk]) transactions[currentChunk] = [];

			transactions[currentChunk].push(query);

			transactionsCount++;
			if (transactionsCount > chunkSize) {
				currentChunk++;
				transactionsCount = 0;
			}
		}

		for (let transaction of transactions) {
			await this.client.$transaction(transaction);
			count += transaction.length;
		}

		console.log(`time execution ${((new Date().getTime() - start.getTime()) / (1000 * 60)).toFixed(2)} minutes.`);

		return count;
	}
}
