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

export function checkIncludes(ext, folderMod, fileMod) {
    let isInclude = true;
    if (folderMod) {
        if (folderMod.includes(`no-import`)   ) isInclude = false
        else if (folderMod.includes(`import`) ) isInclude = true

        if (folderMod.includes(`no-import-${ext}`)   ) isInclude = false
        else if (folderMod.includes(`import-${ext}`) ) isInclude = true
    }
    if (fileMod) {
        if (fileMod.includes(`no-import`)   ) isInclude = false
        else if (fileMod.includes(`import`) ) isInclude = true

        if (fileMod.includes(`no-import-${ext}`)   ) isInclude = false
        else if (fileMod.includes(`import-${ext}`) ) isInclude = true
    }
    //*
    return isInclude
}