import { AppError } from '../AppError/AppError';

/**
 * A {@link PreconditionValidator} is a function that processes arguments to check if a certain prerequisite is satisfied or not.
 * @type `E` the type of Error it will return if it fails
 * @returns `null` if validation passed or an {@link Error} if it failed.
 */
export type PreconditionValidator<E extends Error> = (args: any) => E | null;

/**
 * A utility class to help validate preconditions for a Command
 */
export class Precondition {
	/**
	 * Validates that a list of preconditions are met
	 * @param preconditions an array of preconditions
	 * @param args an object that makes up the arguments of a command
	 * @returns `null` if all preconditions are met, or an {@link Error} specifying why a precondition failed
	 */
	public static validate<E extends Error>(preconditions: PreconditionValidator<any>[], args: any): E | null {
		for (const precondition of preconditions) {
			const error = precondition(args);
			if (error) {
				return error;
			}
		}
		return null;
	}

	/**
	 * Validates that all the args are defined
	 * @param args an object with presumably all the properties specified by `argNames`
	 * @param argNames the list of argument names to check for
	 * @returns an {@link AppError} if `args` does not have a property with key of `argName`
	 */
	public static validateArgsAreDefined(args: any, argNames: string[]): AppError<string> | undefined {
		const missingArgs = argNames.filter(argName => args[argName] == null);
		if (missingArgs.length) {
			const error = new AppError(`Undefined arguments were passed into the command: ${missingArgs}`);
			error.setDetail(`${missingArgs} was undefined`);
			return error;
		}
	}
}
