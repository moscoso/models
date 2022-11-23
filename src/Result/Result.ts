/**
 * A {@link Result} is an an outcome that returns a value of type T if it is successful;
 *
 * Otherwise it fails and returns an Error.
 */
export class Result < T, E extends Error > {
    public isSuccess: boolean;
    public isFailure: boolean;
    public error: E | undefined;
    private _value: T | undefined;

    /**
     * Return a successful Result of type T.
     * @param value returned by a successful Result
     */
    public static ok < T, E extends Error > (value ? : T): Result < T, E > {
        return new Result < T, E >(true, value);
    }

    /**
     * Return a failing Result with an Error that specifies why it failed.
     * @param error returned by a failed result
     */
    public static fail < T, E extends Error > (error: E): Result < T, E > {
        return new Result < T, E >(false, undefined, error);
    }

    /**
     * Construct a Result passing in a value if the result succeeding
     * or passing in an error specifiying why the result failed.
     * @param isSuccess true if successful, false if failed
     * @param value a value to return a succesful result
     * @param error an error specifying why the result failed
     */
    public constructor(isSuccess: boolean, value ? : T, error ? : E) {
        if (isSuccess && !value) {
            throw new Error('InvalidOperation: A successful result needs a value');
        }

        if (isSuccess && error) {
            throw new Error('InvalidOperation: A result cannot be successful and contain an error');
        }

        if (!isSuccess && !error) {
            throw new Error('InvalidOperation: A failing result needs to contain an error message');
        }

        this.isSuccess = isSuccess;
        this.isFailure = !isSuccess;
        this.error = error;
        if (value) {
            this._value = value;
        }

        Object.freeze(this);
    }

    public get value(): T | undefined {
        if (!this.isSuccess) {
            return undefined;
        }

        return this._value;
    }
}
