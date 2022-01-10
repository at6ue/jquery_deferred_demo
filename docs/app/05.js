const deferred = $.Deferred();

setTimeout(() => {
  deferred.resolve();
});

deferred
  .promise()
  .done(() => {
    console.log("1st done");
    return $.get("resource").then((data) => console.log(`done: ${data}`));
  })
  .done(() => {
    console.log("2nd done");
  })
  .then(() => {
    console.log("then");
    return $.get("resource").then((data) => console.log(`then: ${data}`));
  })
  .done(() => {
    console.log("3rd done");
  });

/**
 * 1st done
 * 2nd done
 * then
 * done: data retrieved
 * then: data retrieved
 * 3rd done
 */
