import { MutableController } from '../controller';
import { MutableRepository } from '../repository';
import { ResultOrError } from '../@types/graphql';
import { ControllerImpl } from './controllerImpl';

export abstract class MutableControllerImpl<T> extends ControllerImpl<T> implements MutableController<T> {
	abstract repository: MutableRepository<T>;

	abstract update(externalId: UUID, data: object): Promise<ResultOrError<T>>;

	abstract delete(externalId: UUID): Promise<ResultOrError<string>>;
}
