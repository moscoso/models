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
 * Represents a failure result with an error of type E and an optional failure value of type F.
 *
 * @template E - The type of the error.
 * @template F - The type of the failure value, defaults to `undefined`.
 */
interface FailureResult<E extends Error, F = undefined> {
	error: E;
	value: F;
	isFailure: true;
	isSuccess: false;
}

/**
 * A union type that represents either a successful result with a value of type T,
 * or a failed result with an error of type E and an optional failure value of type F.
 *
 * @template T - The type of the successful result value.
 * @template E - The type of the error.
 * @template F - The type of the failure value, defaults to `undefined`.
 */
export type Result<T, E extends Error, F = undefined> = SuccessResult<T> | FailureResult<E, F>;

/**
 * Creates a successful result with a value of type T.
 *
 * @template T - The type of the successful result value.
 * @template E - The type of the error.
 * @template F - The type of the failure value, defaults to `undefined`.
 *
 * @param {T} value - The value to be returned in the successful result.
 * @returns {Result<T, E, F>} A successful result containing the value.
 */
export function ok<T, E extends Error, F>(value: T): Result<T, E, F> {
	return {
		error: undefined,
		isFailure: false,
		isSuccess: true,
		value
	};
}

/**
 * Creates a failed result with an error of type E and a failure value of type F.
 *
 * @template T - The type of the successful result value (unused in failure).
 * @template E - The type of the error.
 * @template F - The type of the failure value.
 *
 * @param {E} error - The error to be returned in the failed result.
 * @param {F} failureValue - The value to be returned in the failed result.
 * @returns {Result<T, E, F>} A failed result containing the error and the failure value.
 */
export function fail<T, E extends Error, F>(error: E, failureValue: F): Result<T, E, F> {
	return {
		error,
		isFailure: true,
		isSuccess: false,
		value: failureValue
	};
}
