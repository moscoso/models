import { ConstructorIndex, ConstructorParams } from '../Constructor/Constructor';

/**
 * A factory class for creating instances of classes
 * @type C - a collection of classes/constructors as an index
 */
export class ConstructorFactory<C extends ConstructorIndex> {
    constructor(private constructors: C) {}

	/**
     * Creates an instance of a class using its constructor
     * @template T - The type of class to create
     * @param {T} type - The type of command to create
     * @param {ConstructorParams<C[T]>} params - The parameters to pass to the constructor
     * @returns {InstanceType<C[T]>} the created instance
     */
    public get<T extends keyof C>(type: T, params: ConstructorParams<C[T]>): InstanceType<C[T]> {
        const Class = this.constructors[type];
        return new Class(params);
    }

    /**
     * Checks if a string is a valid class type
     * @param {string} s - The string to check
     * @returns {boolean} True if the string is a valid class type, otherwise false
     */
    public hasType(s: string): boolean {
        return this.listAllTypes().includes(s as keyof C);
    }

	/**
     * Lists all valid class types
     * @returns {Array<keyof C>} An array of all valid class types
     */
    public listAllTypes(): (keyof C)[] {
        return Object.keys(this.constructors) as (keyof C)[];
    }
}
