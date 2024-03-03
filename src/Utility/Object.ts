import { deepCopy } from './DeepCopy';

export class ObjectUtility {
	/**
	 * Creates and returns a copy of the given map of objects, with specified numeric properties modified
	 * according to the given change and constraints. This function can access and modify both direct and nested
	 * numeric properties based on the provided property path. It ensures the original objects are not altered.
	 *
	 * If the property at the specified path is not a number, or if the object does not exist, the function throws an error.
	 *
	 * @template T - The type of the objects within the map.
	 * @param {Record<string, T>} objects - A map of objects keyed by string identifiers.
	 * @param {string | string[]} objectIDs - An identifier or array of identifiers for the objects to be modified.
	 * @param {string} propertyPath - The path to the numeric property to be modified, which can include nested properties separated by dots (e.g., 'property.nestedProperty').
	 * @param {number} change - The amount by which to modify the property's value. Can be positive (for incrementing) or negative (for decrementing).
	 * @param {Object} constraints - Optional constraints to apply to the modification.
	 * @param {number} [constraints.min=0] - The minimum value the property can have after modification. Defaults to 0.
	 * @param {number} [constraints.max=Number.MAX_VALUE] - The maximum value the property can have after modification. Defaults to the maximum safe integer value.
	 * @returns {Record<string, T>} - a copy of the object with the modified properties.
	 * @throws {Error} - Throws an error if an object identifier does not exist in the map, if the property path is invalid, or if the specified property is not a number.
	 */
	static modifyNumber<T>(
		objects: Record<string, T>,
		objectIDs: string | string[],
		propertyPath: string,
		change: number,
		constraints: { min?: number, max?: number } = { min: 0, max: Number.MAX_VALUE }
	): Record<string, T> {
		// Deep copy the map of object
		const updatedObjects = deepCopy(objects);

		// Normalize objectIDs into an array
		const ids: string[] = ([] as string[]).concat(objectIDs);

		ids.forEach(objectID => {
			const object = updatedObjects[objectID];
			if (!object) {
				throw new Error(`Object not found: ${objectID}`);
			}

			// Resolve the property path
			const properties = propertyPath.split('.');
			let currentObject: any = object;
			for (let i = 0; i < properties.length - 1; i++) {
				currentObject = currentObject[properties[i]];
				if (currentObject === undefined) {
					throw new Error(`Property path ${propertyPath} is undefined at ${properties[i]}`);
				}
			}
			const lastProperty = properties[properties.length - 1];

			// Check if the property is a number and modify it
			const isNotNumber = typeof currentObject[lastProperty] !== 'number';
			if (isNotNumber) {
				throw new Error(`Property at path ${propertyPath} is not a number`);
			}

			// Apply change with constraints
			let newValue = currentObject[lastProperty] + change;
			newValue = Math.max(constraints.min ?? 0, Math.min(constraints.max ?? Number.MAX_VALUE, newValue));
			currentObject[lastProperty] = newValue;
		});

		return updatedObjects;
	}
}
