/**
 * Group objects by a specified property
 * @param objectArray a list of objects to create the groups from
 * @param property the name of the property to group by
 *
 * @see more at https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#grouping_objects_by_a_property
 */
function groupBy(objectArray: any[], property: string) {
    const callbackFn = (groupMap: any, object: any) => {
        const key = object[property];
        if (!groupMap[key]) {
            groupMap[key] = [];
        }
        groupMap[key].push(object);
        return groupMap;
    };

    return objectArray.reduce(callbackFn, {});
}
