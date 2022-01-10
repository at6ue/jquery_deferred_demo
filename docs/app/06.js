const deferred = $.Deferred();

setTimeout(() => {
  deferred.resolve();
  console.log("resolved");
});

deferred
  .then(() => {
    console.log("1st then");
    setTimeout(() => console.log("1st timeout"));
  })
  .then(() => {
    console.log("2nd then");
    setTimeout(() => console.log("2nd timeout"));
  });

/**
 * jQuery <2.x
 * ---
 * 1st then
 * 2nd then
 * resolved
 * 1st timeout
 * 2nd timeout
 *
 * jQuery 3.x
 * ---
 * resolved
 * 1st then
 * 1st timeout
 * 2nd then
 * 2nd timeout
 */
