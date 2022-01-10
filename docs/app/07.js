const promise = new Promise((resolve) => {
  setTimeout(() => {
    resolve();
    console.log("resolved");
  });
});

promise
  .then(() => {
    console.log("1st then");
    setTimeout(() => console.log("1st timeout"));
  })
  .then(() => {
    console.log("2nd then");
    setTimeout(() => console.log("2nd timeout"));
  });

/**
 * resolved
 * 1st then
 * 2nd then
 * 1st timeout
 * 2nd timeout
 */
