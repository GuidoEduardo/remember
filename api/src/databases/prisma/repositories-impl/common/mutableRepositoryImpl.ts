import { MutableRepository } from '../../../../services/common/repository';
import { RepositoryImpl } from './repositoryImpl';

export abstract class MutableRepositoryImpl<T> extends RepositoryImpl<T> implements MutableRepository<T> {
	abstract update(externalId: UUID, data: object): Promise<T>;

	abstract delete(externalId: UUID): Promise<void>;
}
