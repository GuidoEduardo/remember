type UUID = string;

type StaticImplements<I, C extends I> = InstanceType<I>;

type MakeOptional<T> = {
	[K in keyof T]?: T[K];
};
