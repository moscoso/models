/**
 * Copy all fields, and makes copies of dynamically
 * allocated memory pointed to by the fields (i.e. Dates, Arrays, and other sub-objects)
 *
 * @Note this is more reliable then `JSON.stringify(JSON.parse(obj))`
 *
 * @param obj an object
 * @returns a deep copy of the object
 */

export function deepCopy(obj: any): any {
    let copy: any;

    // Handle the 3 simple types, and null or undefined
    if (obj == null || typeof obj !== 'object') { return obj; }

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (const attr in obj) {
            // eslint-disable-next-line no-prototype-builtins
            if (obj.hasOwnProperty(attr)) { copy[attr] = deepCopy(obj[attr]); }
        }
        return copy;
    }

    throw new Error('Unable to copy obj! Its type isn\'t supported.');
}
