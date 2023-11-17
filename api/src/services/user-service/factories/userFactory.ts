import { randomUUID } from "crypto";
import { Factory } from "../../common/factory";
import { UserData } from "../@types/user.schema";
import { User } from "../entities/user";
import { Name } from "../value-objects/name";
import { UserId } from "../value-objects/userId";

class UserFactory implements StaticImplements<Factory<User>, typeof UserFactory> {
	static create(user: UserData): User {
		return User.newBuilder()
			.setId(new UserId(user.id || randomUUID()))
			.setUsername(user.username)
			.setEmail(user.email)
			.setName(new Name(user.firstName, user.lastName))
			.build();
	}
}
