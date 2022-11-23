/**
 * Check for undefined values in a map
 * @param map an object of key value pairs
 * @throws if any of the values in the map are `undefined`
 */
export function checkForUndefined(map: {[key: string]: any}) {
    let invalidKey = '';
    const undefinedFound = Object.keys(map).some((key) => {
        invalidKey = key;
        return map[key] === undefined;
    });
    if (undefinedFound) { throw new Error(`CommandHelper error: ${invalidKey} was undefined`); }
}
