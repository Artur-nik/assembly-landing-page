import through2 from 'through2';
import fs from 'fs';

const _config = {
    path: 'src/scss/modifiers/_create.g.scss',
    bp: ['sm', 'xs', 'md' ,'lg', 'xl', 'hg', 'hd'],
    mod: {
        'z-': {
            property: 'z-index',
            value(_val) {return `${_val}`},
        },
        'lh-': {
            property: 'line-height',
            value(_val) {return `${_val}%`},
        },
        'br-': {
            property: 'border-radius',
            value(_val) {return `size(${_val})`},
        },
        'delay-': {
            property: 'animation-delay',
            value(_val) {return `${_val}ms`},
        },
        't:size-': {
            className: 't\\:size-',
            property: 'font-size',
            value(_val) {return `size(${_val})`},
        },
        'mw-': {
            property: 'max-width',
            value(_val) {return `size(${_val})`},
        },
        'w-': {
            property: 'width',
            value(_val) {return `size(${_val})`},
        },
        'm-': {
            property: 'margin',
            value(_val) {return `size(${_val})`},
        },
        'mb-': {
            property: 'margin-bottom',
            value(_val) {return `size(${_val})`},
        },
        'mr-': {
            property: 'margin-right',
            value(_val) {return `size(${_val})`},
        },
        'mt-': {
            property: 'margin-top',
            value(_val) {return `size(${_val})`},
        },
        'ml-': {
            property: 'margin-left',
            value(_val) {return `size(${_val})`},
        },
        'p-': {
            property: 'padding',
            value(_val) {return `size(${_val})`},
        },
        'pb-': {
            property: 'padding-bottom',
            value(_val) {return `size(${_val})`},
        },
        'pr-': {
            property: 'padding-right',
            value(_val) {return `size(${_val})`},
        },
        'pt-': {
            property: 'padding-top',
            value(_val) {return `size(${_val})`},
        },
        'pl-': {
            property: 'padding-left',
            value(_val) {return `size(${_val})`},
        },
        'gap-x-': {
            property: '--grid-gap-x',
            value(_val) {return `#{size(${_val})}`},
        },
        'gap-y-': {
            property: '--grid-gap-y',
            value(_val) {return `#{size(${_val})}`},
        },
    }
}

export default function parseHTMLClass(params) {
    //*
    const valClass = new Set([]) 
    //*
    return through2.obj(function(file, enc, cb) {

        const content = file.contents.toString()
        let newcontent = ' '
        content.replace(/class="([^"]*)"/g, (e, item ,q)=> {
            newcontent = newcontent + ' ' + item.trim().replace(/ +/g, " ")
        })
        //*
        newcontent.trim().split(" ").forEach(element => {
            element = element.trim()
            if (element.length) {
                valClass.add(element)
            }
        })

        this.push(file);
        cb();
    }, (cb) => {createMod(valClass, _config, params), cb() });
}

let checkList = []

//*
function createMod(classList, config, path) {
    let _css = '';
    let localCheckList = []

    for (let className of classList) {
        let matches = className.match(/^(.+?)(\d+)(@(.+))?$/);

        if (!matches) continue;

        let [, prefix, number, bp] = matches;

        let mod = config.mod[prefix];
        
        if (!mod) continue;
        //
        localCheckList.push(className)
        //*
        let classNameCSS = `.${mod.className ? mod.className + number : className}`;

        let rulesCSS = `${mod.property}: ${mod.value(number)};`;
        
        if (bp) {
          classNameCSS = classNameCSS.replace(bp, '');
          bp = bp.replace('@', '');
          if (!config.bp.includes(bp)) continue;
        
          classNameCSS += `\\@${bp}`;
          rulesCSS = `@include media(${bp}) { ${rulesCSS} }`;
        }
        
        _css += `${classNameCSS} { ${rulesCSS} }\n`;
    }
    

    if (JSON.stringify(checkList) !== JSON.stringify(localCheckList)) {
        checkList = localCheckList
        const includeStream = fs.createWriteStream(path)
        includeStream.write(_css)
        includeStream.end()
    } 
    
}