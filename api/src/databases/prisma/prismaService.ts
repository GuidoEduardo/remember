import { PrismaClient } from "@prisma/client";
import { UserRepositoryImpl } from "./repositories-impl/member-service/userRepositoryImpl";

const client = new PrismaClient();

const repositories = {
	userRepository: new UserRepositoryImpl(client),
}

export { repositories };
