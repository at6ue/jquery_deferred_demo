// @ts-check

const code = document.getElementById("code");
const log = document.getElementById("log");
const version = document.getElementById("version");
const sample = document.getElementById("sample");

if (
  !(sample instanceof HTMLSelectElement) ||
  !(version instanceof HTMLSelectElement)
)
  throw new TypeError();

[...Array(7)].forEach((_, i) => {
  const name = (i + 1).toString().padStart(2, "0");
  sample.add(new Option(name, name));
});

const jQueryResources = new Map([
  [
    "1",
    {
      version: "1.12.4",
      integrity: "sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=",
    },
  ],
  [
    "2",
    {
      version: "2.2.4",
      integrity: "sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=",
    },
  ],
  [
    "3",
    {
      version: "3.6.0",
      integrity: "sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4=",
    },
  ],
]);

jQueryResources.forEach((jq, majaor) => {
  version.add(new Option(jq.version, majaor));
});

const consoleLog = console.log;
console.log = (incoming) => {
  log.textContent += `${incoming}\n`;
  consoleLog(incoming);
};

const reset = () => {
  log.textContent = "";
  code.textContent = "";
};

let currentJQueryMajorVersion = "";

const loadJQuery = (ver) => {
  const jq = jQueryResources.get(ver);
  if (typeof jq === "undefined") throw new TypeError();

  return fetch(`https://code.jquery.com/jquery-${jq.version}.min.js`, {
    integrity: jq.integrity,
  })
    .then((res) => res.text())
    .then((script) => {
      Function(script)();
      currentJQueryMajorVersion = ver;
    });
};

const start = () => {
  const ver = version.value;
  const jQueryLoaded =
    currentJQueryMajorVersion === ver ? Promise.resolve() : loadJQuery(ver);

  consoleLog(`== Sample ${sample.value} ==`);
  reset();

  jQueryLoaded
    .then(() => fetch(`app/${sample.value}.js`))
    .then((res) => res.text())
    .then((script) => {
      if (typeof $ === "undefined") throw new ReferenceError();
      code.textContent = script;
      Function(script)();
    });
};

loadJQuery(version.value);
