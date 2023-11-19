import { SearcherImpl } from '../../../../common/resolvers/searcherImpl';
import { User } from '../../../@types/user';
import { UserController } from '../../../controllers/userController';

export class UserSearcher extends SearcherImpl<User> {
	constructor(controller: UserController) {
		super();
		this.setController(controller);
	}
}
