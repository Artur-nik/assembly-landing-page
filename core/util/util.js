export const isObject = (val) => toString.call(val).slice(8, -1) === 'Object'
export const isArray = (val) => Array.isArray(val)
export const isString = (val) => typeof val === 'string'
export const isFunction = (val) => typeof val === 'function';
export const isBoolean = (val) => typeof val === 'boolean';
export const isValid = (val) => {
    if (isObject(val)) {
        return !!Object.keys(val).length
    }
    else if (isArray(val)) {
        return !!val.length
    }
    else if (isString(val)) {
        return !!val.length
    }
    else if (isBoolean(val)) {
        return val
    }
};

//*
export function createError(value, message) {
    if (isFunction(message)) message = message(value)    
    if (value) {
        throw new Error(message)
    }
}
//*
export function symbolEnd(_val, _symbol) {
    if (isString(_val)) {
        if (isString(_val) && _val.slice(-1) !== _symbol) {
            return _val + _symbol
        }
        else {
            return _val
        }
    }
    else {
        return false
    }
}
//*
export function symbolStart(_val, _symbol) {
    if (isString(_val)) {
        if (_val.slice(0,1) !== _symbol) {
            return _symbol + _val
        }
        else {
            return _val
        }
    }
    else {
        return false
    }
}

