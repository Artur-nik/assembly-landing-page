import fs from "fs";
import JSON5 from "json5";
import { parse } from "path";

import { createError, isArray, isFunction, isObject, isString, isValid, symbolEnd} from "../util/util.js";
//*



//*
export const local_fileModConfig = {
    search: /(?:#|(?<![()]):(?![()])|~)((?:[\w\d-_\/\s\.]+|\([^)]*\))+)/g, 
    setup(fullName, searchMod){
        let name = fullName
        const listMod = {
            ':':  'base',
            '#':  'collection',
            '~':  'dependency'
         }
        const modifiers = {} 
        //*
        fullName.replace(searchMod, (match, target, index, text)=> {
            const nameMod = listMod[text.trim().charAt(index)]
            if (!modifiers[nameMod]) modifiers[nameMod] = []
            modifiers[nameMod].push(target)
            name = name.replace(match, '')
        })   
        //*
        return {name, modifiers}
    },
}
//*
export const local_folderModConfig = {
    search: /(?:(?<![()]):(?![()]))((?:[\w\d-_\/\s\.]+|\([^)]*\))+)/g, 
    setup(fullName, searchMod){
        let name = fullName
        const listMod = {
            ':':  'base'
         }
        const modifiers = {} 
        //*
        fullName.replace(searchMod, (match, target, index, text)=> {
            const nameMod = listMod[text.trim().charAt(index)]
            if (!modifiers[nameMod]) modifiers[nameMod] = []
            modifiers[nameMod].push(target)
            name = name.replace(match, '')
        })   
        //*
        return {name, modifiers}
    },
}

//* core
export function ProjectFileSystem(opts) {
    //? Получение данных
    const rawData = parseConfig(opts.getData)
    if (!rawData) {
        console.log(`${opts.getData}: getData - нет данных`);
        return
    }
    //? Получение rootPath
    const rootPath = opts.rootPath
    createError(!rootPath, 'rootPath - Root path is required for the configuration file')
    //? Mod
    const fileModConfig   = opts.modFile   || local_fileModConfig
    const folderModConfig = opts.modFolder || local_folderModConfig
    //? listFiles
    const formattedData = parceFiles(rawData, rootPath, fileModConfig ,folderModConfig)
    //? extensions -
    const extensions = opts.extensions
    //? includeOpts - 
    const includeOpts = opts.include
    if (includeOpts) createError(!isFunction(includeOpts), (err)=> `include: ${err} != function`)
    //? setup
    const setup = opts.setup
    if (setup) createError(!isFunction(setup), (err)=> `setup: ${err} != function`)
    //*
    const workspace = opts.workspace
    if (workspace) {
        createError(!isFunction(workspace), (err)=> `workspace : ${err} != function`)
        workspace(formattedData, extensions)
    }
    //* extensions
    if (extensions) {
        createError(!isObject(extensions), (err)=> `extensions: ${err} != Object`)
        //*
        const extNameList = []
        Object.keys(extensions).forEach((extensionName) => {
            createError(!isString(extensions[extensionName].ext), (err)=> `extensions->name->ext (required): ${err} != string`)
            extNameList.push(extensions[extensionName].ext)
        })
        Object.keys(extensions).forEach((extensionName, extensionIndex) => {
            //*
            const includeList = [];
            //*
            const extension = extensions[extensionName]
            const { ext, template} = extension
            const includeConfig = extension.include
            //*
            const config  = {
                extensions,
                includeConfig: includeConfig,
                rootPath, 
                extNameList: extNameList,
                includeList: includeList
            }
            //*
            formattedData.forEach((file, fileIndex) => {
                file.fileIndex = fileIndex
                file.ext = ext
                file.extName = extensionName
                file.extIndex = extensionIndex
                file.template = template
                if (setup) {
                    setup(file, config, (params) => {
                        if (isObject(params)) {
                            const { filePath, includePath, customTemplate } = params
                            if (filePath) createFile(file.srcPath + filePath, customTemplate || template || '')
                            if (includePath !== false) includeItemPush(filePath.replace(`.${ext}`, ''), includePath, includeList, includeConfig)
                        }
                        else if (isString(params)) {
                            createFile(file.srcPath + params, template || '')
                            if (includeConfig) includeItemPush(params.replace(`.${ext}`, '') , undefined, includeList, includeConfig)
                        }
                    })
                }
            });
            if (includeOpts) {
                includeOpts(includeList, extensionName);
                return
            }
            //*
            if (includeConfig && includeConfig.path) {
                includeFile(includeConfig.path, includeList, '\n')
            }
        })
    }
}


//*================== parseConfig ==================


const DEFAULT_TEMPLATE = `{
    
}`;

export function parseConfig(config) {
    //* Проверяем, предоставлен ли объект конфигурации
    createError(!config, 'Объект конфигурации обязателен');
    
    if (isString(config)) {
        
        if (!config.length) return {};
        
        //* Проверяем или создаем файл с предоставленным шаблоном
        createFile(config, DEFAULT_TEMPLATE);

        //* Разбираем данные JSON5
        return JSON5.parse(fs.readFileSync(config, "utf-8") || '{}');
    }
    else if (isObject(config)) {
        let configData = config.value;

        if (config.path) {
            //* Проверяем, существует ли указанный путь конфигурации
            let parsedData = parseConfig(config.path);
            if (isValid(parsedData)) {
                configData = parsedData;
            }
        }

        if (config.delete) {
            //* Проверяем, является ли свойство delete массивом
            createError(!isArray(config.delete), 'Свойство delete должно быть массивом');
            //* Если данные конфигурации являются функцией, применяем функцию delete
            if (isFunction(configData)) {
                configData = config.delete(configData);
            }
            //* Если данные конфигурации являются объектом, удаляем указанные свойства
            if (isObject(configData)) {
                config.delete.forEach(key => {
                    delete configData[key];
                });
            }
        }
        
        if (config.type) {
            if (isString(config.type)) {
                createError(typeof configData !== config.type, `configData - должен быть type === ${config.type}`)
            }
            if (isFunction(config.type)) {
                config.type(configData)
            }
        }

        return configData;
    }
    else {
        createError(true, `Объект конфигурации должен быть объектом или строкой`);
        return {};
    }
}

//*================== parceFiles ==================

//?
export function parceFiles(rawData, rootPath, fileModConfig, folderModConfig) {
    //*
    const listFiles = []    
    //*
    if (isString(rawData)) {
        createItem({name: rawData})
    }
    else if (isArray(rawData)) {
        rawData.forEach(fileName => createItem({name: fileName}))
    }
    else if (isObject(rawData)) {
        //*
        Object.keys(rawData).forEach(folder => {
            let objFile = {}
            objFile[folder] = rawData[folder]
            const [ newFolderName, newFolderMod ] = parseMod(folder, folderModConfig)
            createItem({name: objFile, firstFolder: newFolderName})
        })
    }
    //*
    //? config: name, path, pathList, folder, firstFolder, folderMod
    function createItem(config){
        //*
        if (!config.path) config.path = ''
        config.path.replace(/\s+/g, '') 
        //*
        if (isString(config.name)) {
            //*
            let [ newFileName, newFileMod ] = parseMod(config.name, fileModConfig)
            //*
            config.firstFolder = config.firstFolder ===  undefined ? false : config.firstFolder
            //*
            config.folder = config.folder ===  undefined ? false : config.folder
            //*
            config.folderMod = config.folderMod ===  undefined ? false : config.folderMod
            //*
            const nameChanged = !newFileName.length
            //*
            newFileName = newFileName.length ? newFileName : config.folder ===  undefined ? '' : config.folder
            //*
            rootPath = symbolEnd(rootPath, '/')
            //*
            const item = {
                name: newFileName,
                nameChanged: nameChanged,
                srcPath: rootPath,
                fullPath: symbolEnd(rootPath + config.path, '/') ,
                relativePath: symbolEnd(config.path, '/'),
                prevPath: (config.prevPath && config.prevPath.length) ? symbolEnd(config.prevPath, '/') : '',
                fullPrevPath: config.prevPath ? symbolEnd(rootPath + config.prevPath, '/') : '',
                folder: config.folder,
                firstFolder: config.firstFolder,    
                checkFirstFolder: config.firstFolder ? (config.firstFolder === config.folder) : false,
                fileMod: newFileMod,
                folderMod: config.folderMod 
            }
            //*
            if (item.name.length || item.folder) {
                listFiles.push(item)
            }
        }
        else if (isArray(config.name)) {
            config.name.forEach(file => {
                config.name = file
                createItem(config)
            })
        }
        else if (isObject(config.name)) {

            for (let folder in config.name) {
                const [ newFolderName, newFolderMod ] = parseMod(folder, folderModConfig)
                createItem({
                    name: config.name[folder], 
                    path: pathFolder(config.path, newFolderName ),
                    prevPath: config.path,
                    folder: newFolderName.length ? newFolderName : false,
                    firstFolder: config.firstFolder || false,
                    folderMod: newFolderMod,
                })
            }
        }
        
    }
    //*
    return listFiles
}
//?
export function parseMod(fullName, config) {
    if (!isString(fullName)) {
        createError(true, `parseMod(${fullName}, ${config}) - Only string allowed`)
        return
    }
    let name = fullName;
    let modifiers = false
    //* 
    if (config && isObject(config) && ' ' + fullName.search(config.search) && config.setup) {
        //*
        const setupValue = config.setup(fullName, config.search)
        name = setupValue.name
        
        modifiers = (
            (isObject(setupValue.modifiers) && Object.keys(setupValue.modifiers).length) 
            || 
            (isArray(setupValue.modifiers) && setupValue.modifiers.length)) ? setupValue.modifiers : false 
    }
    name = name.trim()
    //*
    return [name, modifiers]
}

//?
export function pathFolder(path, name) {
    if (path.length) {
        return path + '/' + name
    }
    else { 
        return name
    }
}


//*================== includePush ==================


export function includeItemPush(pathFile, customPath, list, config) {  
    if (config) {
        //?
        if (customPath === undefined){ 
            customPath = true
        }
        //? 
        if ( isString(customPath)) {
            list.push(customPath);
            return
        }
        if (isFunction(customPath)) {
            list.push(String(customPath(config)));
            return
        } 
        if (customPath && pathFile && isString(pathFile)) {
            list.push(
                (config.start || '') + pathFile + (config.ext || '') + (config.end || '')
            );
            return
        }
    }
}


//*================== includeFile ==================

// rootPath - String
// list - Array
// separator -  String
//?
export function includeFile(rootPath, list, separator = '\n') {
    //*
    createFile(rootPath)
    //fs.truncate(rootPath, (err) => {})
    //*
    const includeStream = fs.createWriteStream(rootPath)
    includeStream.write(list.join(separator))
    includeStream.end()
}


//*================== createFile ==================


//? Проверка и создание файла с шаблоном:
export function createFile(path, template) {
    if (path) {
        const { dir, name } = parse(path)
        //* 
        if (dir) fs.mkdirSync(dir, { recursive: true }, err => {})
        //* 
        if (!fs.existsSync(path)) {
            //*
            const fileStream = fs.createWriteStream(path);  
            //*
            if (template && template.length) {   
                //* 
                if (isFunction(template)) {
                    fileStream.write(template(name))
                }
                //*
                else if (isString(template)){
                    fileStream.write(template)
                }
            }
            //*
            fileStream.end()
        }
    }
}
