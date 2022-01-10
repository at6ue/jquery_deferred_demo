const firstArg = "1st arg";
const secondArg = "2nd arg";

const deferred = $.Deferred();
setTimeout(() => {
  deferred.reject(firstArg); // A
});

deferred
  .promise()
  .fail((arg) => {
    // B
    console.log(arg);
    return secondArg;
  })
  .then(
    () => {},
    (arg) => {
      // C
      console.log(arg);
      return $.Deferred().resolve(secondArg).promise();
    }
  )
  .done((arg) => {
    // D
    console.log(arg);
  });

/**
 * 1st arg
 * 1st arg
 * 2nd arg
 */
