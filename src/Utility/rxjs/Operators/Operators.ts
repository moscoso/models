/**
 * This file contains reusable observable operators and pipes to keep the code base DRYer
 */

import { first, firstValueFrom, Observable, OperatorFunction } from 'rxjs';
import { requestComplete, validString, nonNull } from '../Predicates/Predicates';

/*************************************************************************
 * Commonly used operators combined with commonly used predicate functions
 *************************************************************************/
/**
 * An operator that emits only the first value that is defined and not null
 */
 export const firstNonNullValue: OperatorFunction < any, any > = first(nonNull);
/**
 * An operator that emits only the first value once a request completes
 */
export const firstRequestComplete: OperatorFunction < any, boolean > = first(requestComplete);
/**
 * An operator that emits only the first string that is defined and not empty
 */
export const firstValidString: OperatorFunction < string, string | boolean > = first(validString);

/**
 * A utility function that converts an observable to a promise that delivers a value once a request completes
 *
 * @param observable a stream of data that may emit multiple values
 */
export function whenRequestCompletes(observable: Observable < boolean >): Promise < boolean > {
    return firstValueFrom(observable.pipe(firstRequestComplete));
}

/*********************************************
 * Utility functions that convert observables
 * to promises.
 *******************************************/
/**
 * A utility function that converts an observable to a promise that delivers once a non-null value is emitted
 *
 * @param observable a stream of data that may emit multiple values
 */
export function whenNonNull< T >(observable: Observable < T >): Promise < T > {
    return firstValueFrom(observable.pipe< T >(firstNonNullValue));
}

/************************************************************
 * Commonly used rxjs operators re-exported here for convenience
 * to help reduce the number of import statements
 *************************************************************/
 export {
    distinct,
    distinctUntilChanged,
    first,
    pluck
} from 'rxjs/operators';
