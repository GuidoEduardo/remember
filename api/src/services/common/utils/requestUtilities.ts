import { Request } from "../@types/graphql";

const setOptions = (options?: Request) => {
	return {
		offset: options ? (options.offset ?? 10) :  10,
		currentPage: options ? (options.currentPage ?? 0) : 0,
	}
};

export { setOptions };
