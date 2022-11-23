/**
 * Validates that a given object is a positive finite number
 * @param number the object to check
 * @returns true if the object is a positive finite number, or false otherwise
 */
export function isAPositiveNumber(number: any): boolean {
	return (!isNaN(number) && isFinite(number) && number > 0);
}
