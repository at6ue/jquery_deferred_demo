const fn = () => {
  const deferred = $.Deferred();

  setTimeout(() => {
    console.log("(won't be resolved)");
    deferred.resolve("resolved");
  });

  return deferred;
};

const deferred = fn();
deferred
  .done((resolved) => {
    console.log(resolved);
  })
  .fail((rejected) => {
    console.log(rejected);
  });

deferred.reject("rejected");

/**
 * rejected
 * (won't be resolved)
 */
