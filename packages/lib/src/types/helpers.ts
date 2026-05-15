export type SerializedDate<T> = {
	[K in keyof T]: T[K] extends Date ? string : T[K];
};

export type IsNullable<T> = T | null | undefined;