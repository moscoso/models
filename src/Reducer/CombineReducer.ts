/**
 * Applies a list of reducers for a given event on a given state in the order specified by the array.
 * E.g. If given an array with reducers [A, B, C] , A will be applied first, then B, then C.
 * @type S the type of the State currently being reduced
 * @type E the type of the Event currently being reduced
 */
export function combineReducers<S, E>(
    state: S,
    event: E,
    reducers: ((event: E, state: S) => S)[]
): S {
    reducers.forEach((reducer) => {
        state = Object.assign({}, state, reducer(event, state));
    });
    return state;
}
