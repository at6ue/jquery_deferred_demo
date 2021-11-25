// @ts-check

/**
 * @property {import('jquery')} $
 */

const consoleLog = console.log;
console.log = (/** @type string */ incoming) => {
  $('#log').text((_, original) =>
    original ? [original, incoming?.replace('#', '\n#')].join('\n') : incoming
  );
  consoleLog(incoming);
};

const DELAY = 0;

/** @type {(() => Promise)[]} */
const demo = [];

demo.push(async () => {
  const promise = new Promise(resolve => {
    setTimeout(() => {
      console.log('## Promise then');
      resolve();
      console.log('resolved');
    }, DELAY);
  });

  return promise.then(() => {
    console.log('1st then');
    setTimeout(() => console.log('1st timeout'));
  }).then(() => {
    console.log('2nd then');
    setTimeout(() => console.log('2nd timeout'));
  });

});

demo.push(async () => {
  const deferred = $.Deferred();

  setTimeout(() => {
    console.log('## jQuery then');
    deferred.resolve();
    console.log('resolved');
  }, DELAY);

  return deferred.then(() => {
    console.log('1st then');
    setTimeout(() => console.log('1st timeout'));
  }).then(() => {
    console.log('2nd then');
    setTimeout(() => console.log('2nd timeout'));
  });

});


demo.push(async () => {
  const deferred = $.Deferred();

  setTimeout(() => {
    console.log('## done');
    deferred.resolve();
    console.log('resolved');
  }, DELAY);

  return deferred
    .done(() => console.log('1st done'))
    .always(() => console.log('always'))
    .done(() => console.log('2nd done'))
    .then(() => console.log('then'));

});

demo.push(async () => {
  const deferred = $.Deferred();

  setTimeout(() => {
    console.log('## xhr in done');
    deferred.resolve();
    console.log('resolved');
  }, DELAY);

  return deferred.done(() => {
    console.log('1st done');
    return $.get('resource').then(data => console.log(`done: ${data}`));
  }).done(() => {
    console.log('2nd done');
  }).then(() => {
    console.log('then');
    return $.get('resource').then(data => console.log(`then: ${data}`));
  }).done(() => {
    console.log('3rd done');
  });

});

demo.push(async () => {
  const deferred = $.Deferred();

  setTimeout(() => {
    console.log('## pipe');
    deferred.resolve();
    console.log('resolved');
  }, DELAY);

  return deferred
    .done(() => console.log('1st done'))
    .always(() => console.log('always'))
    .done(() => console.log('2nd done'))
    .pipe(() => console.log('pipe'));

});

(async () => {
  console.log('# START');

  for (const fn of demo) {
    await fn();
  }

  console.log('# END');
})();
