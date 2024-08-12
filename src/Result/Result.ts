/**
 * Represents a successful result with a value of type T.
 *
 * @template T - The type of the successful result value.
 */
interface SuccessResult<T> {
	value: T;
	error: undefined;
	isSuccess: true;
	isFailure: false;
}

/**
 * Represents a failure result with an error of type E.
 *
 * @template E - The type of the error.
 */
interface FailureResult<E extends Error> {
	error: E;
	value: undefined;
	isFailure: true;
	isSuccess: false;
}

/**
 * A union type that represents either a successful result with a value of type T,
 * or a failed result with an error of type E.
 *
 * @template T - The type of the successful result value.
 * @template E - The type of the error.
 */
export type Result<T, E extends Error> = SuccessResult<T> | FailureResult<E>;

/**
 * Creates a successful result with a value of type T.
 *
 * @template T - The type of the successful result value.
 * @template E - The type of the error.
 *
 * @param {T} value - The value to be returned in the successful result.
 * @returns {Result<T, E>} A successful result containing the value.
 */
export function ok<T, E extends Error>(value: T): Result<T, E> {
	return {
		error: undefined,
		isFailure: false,
		isSuccess: true,
		value
	};
}

/**
 * Creates a failed result with an error of type E.
 *
 * @template T - The type of the successful result value (unused in failure).
 * @template E - The type of the error.
 *
 * @param {E} error - The error to be returned in the failed result.
 * @returns {Result<T, E>} A failed result containing the error.
 */
export function fail<T, E extends Error>(error: E): Result<T, E> {
	return {
		error,
		isFailure: true,
		isSuccess: false,
		value: undefined
	};
}
