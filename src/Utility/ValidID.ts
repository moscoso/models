/**
 * An invalid ID is either undefined or an empty string
 * @param id the string to check
 */
 export function invalidID(id: string): boolean {
    return id === undefined || id.length === 0;
}

/**
 * A valid ID is defined and is a non empty string
 * @param id the string to check
 */
export function validID(id: string): boolean {
    return id !== undefined && id.length > 0;
}
