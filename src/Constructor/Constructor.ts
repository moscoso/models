/** A type alias for any class constructor */
export type Constructor<T = any> = new (...args: any[]) => T;

/**
 * An index of Command constructors
 * Note: Use this as the type when exporting a collection of classes from an index file.
 **/
export type ConstructorIndex = Record<string, new (...args: any) => any>;

/**
 * Utility type to extract the type of a constructors first parameter
 * @type T - The constructor to extract parameters from
 */
export type ConstructorParams<T extends Constructor> = ConstructorParameters<T>[0];
