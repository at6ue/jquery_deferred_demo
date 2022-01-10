const deferred = $.Deferred();
const promise = deferred.promise();
const promiseDone = promise.done(() => {});
const promiseThen = promise.then(() => {});
console.log(`done returns ${promise === promiseDone ? "same" : "new"} promise`);
console.log(`then returns ${promise === promiseThen ? "same" : "new"} promise`);

/**
 * done returns same promise
 * then returns new promise
 */
