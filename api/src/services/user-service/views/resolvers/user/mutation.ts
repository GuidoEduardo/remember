import { MutableMutatorImpl } from '../../../../common/resolvers/mutatorImpl';
import { User } from '../../../@types/user';
import { UserController } from '../../../controllers/userController';

export class UserMutator extends MutableMutatorImpl<User> {
	constructor(controller: UserController) {
		super(controller);
	}
}
