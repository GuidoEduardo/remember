import { Request } from "../@types/graphql";

const setOptions = (options?: Request) => {
	return {
		offset: options ? (options.offset ? (options.offset <= 1000 ?? 1000) : 10) :  10,
		currentPage: options ? (options.currentPage ? (options.currentPage <= 1000 ?? 1000) :  0) : 0,
	}
};

export { setOptions };
