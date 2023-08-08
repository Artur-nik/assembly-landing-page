export const isObject = (val) => toString.call(val).slice(8, -1) === 'Object'
export const isArray = (val) => Array.isArray(val)
export const isString = (val) => typeof val === 'string'
export const isFunction = (val) => typeof val === 'function';
export const isBoolean = (val) => typeof val === 'boolean';
export const isHTMLElement = (val) => val instanceof HTMLElement;
export const isNumber = (val) => !!Number(val);