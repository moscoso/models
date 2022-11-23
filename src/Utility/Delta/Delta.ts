/**
 * A utility class to help return the difference between two objects by comparing the object using deep equality.
 */
export class Delta {
    /**
     * Return an object that represents the difference between two objects.
     * Order matters! The returned difference object will use the values from b
     *
     * `NOTE: Only works with shallow objects. Primitives and arrays will be
     * tested but nested objects will not be tested for equality.`
     */
    public static object(a: any, b: any): object {
        const diff = Object.assign({}, a, b);
        Object.keys(a).forEach((key) => {
            const valueA = a[key];
            const valueB = b[key];
            let valuesMatch: boolean;
            const bothAreArrays = valueA instanceof Array && valueB instanceof Array;
            if (bothAreArrays) {
                valuesMatch = this.arraysMatch(valueA, valueB);
            } else {
                valuesMatch = valueA === valueB;
            }

            if (valuesMatch) {
                delete diff[key];
            }
        });
        return diff;
    }

    private static arraysMatch(a: any[], b: any[]): boolean {
        const differentSizes = a.length !== b.length;
        if (differentSizes) { return false; }

        return a.every((value, index) => a[index] === b[index]);
    }

    private static isPrimitive(test: any) {
        return (test !== Object(test));
    }
}
