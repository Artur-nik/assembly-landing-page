const isObject = (val) => toString.call(val).slice(8, -1) === 'Object'
const isArray = (val) => Array.isArray(val)
const isString = (val) => typeof val === 'string'
const isFunction = (val) => typeof val === 'function';
const isBoolean = (val) => typeof val === 'boolean';
const isHTMLElement = (val) => val instanceof HTMLElement;