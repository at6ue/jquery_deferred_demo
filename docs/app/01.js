const fn = () => {
  const deferred = $.Deferred();

  setTimeout(() => {
    console.log("resolve");
    deferred.resolve("1st");
  });

  return deferred.promise();
};

const promise = fn();
const ret = promise
  .then((first) => {
    console.log(`${first} then`);
    return "2nd";
  })
  .then((second) => {
    console.log(`${second} then`);
  });

console.log("start");

/**
 * start
 * resolve
 * 1st then
 * 2nd then
 */
