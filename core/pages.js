import fs from "fs";
import { createError, isArray, isObject, isString } from "./util/util.js";
import { createFile, includeFile, parseMod, parseConfig, ProjectFileSystem, local_fileModConfig, local_folderModConfig } from "./fileSystem/ProjectFileSystem.js";
import { pageTemplate, sectionTemplate, styleTemplate } from "./fileSystem/template.js";

export default async function addFilePage(){
    const listPages = parseConfig('./src/pages/pages.json')
    const streamList = {
        scripts: {
            path: './src/js/paths/pages.g.js', 
            list: []
        },
        styles: {
            path: './src/scss/paths/pages.g.scss', 
            list: []
        },
    }

    Object.keys(listPages).forEach(page => {
        //* 
        const sectionList = listPages[page]
        //*
        const [ pageName ] = parseMod(page, local_folderModConfig)
        
        //*
        if (pageName === "main") {
            createFile(`./src/pages/${pageName}/index.html`, pageTemplate(pageName))
            createFile(`./src/pages/${pageName}/_include.g.html`)
            app.page.push(`./src/pages/${pageName}/index.html`)
        }
        else {
            createFile(`./src/pages/${pageName}/${pageName}.html`, pageTemplate(pageName))
            createFile(`./src/pages/${pageName}/_include.g.html`)
            app.page.push(`./src/pages/${pageName}/${pageName}.html`)
            //*
            fs.mkdir(`./src/images/${pageName}`, { recursive: true }, err => {});
        }
        //*
        const streamSectionList = {
            path: `./src/pages/${pageName}/_include.g.html`, 
            list: []
        }
        //*
        if (isArray(sectionList)) {
            sectionList.forEach(section => {
                const [ sectionName ] = parseMod(section, local_fileModConfig)
                createFile(`./src/pages/${pageName}/${sectionName}/${sectionName}.js`)
                createFile(`./src/pages/${pageName}/${sectionName}/${sectionName}.scss`, styleTemplate)
                createFile(`./src/pages/${pageName}/${sectionName}/${sectionName}.html`, sectionTemplate)
                //*
                streamList.scripts.list.push(`import "../../pages/${pageName}/${sectionName}/${sectionName}.js";`)
                streamList.styles.list.push(`@import "../../pages/${pageName}/${sectionName}/${sectionName}";`)
                streamSectionList.list.push(`@@include("./${sectionName}/${sectionName}.html",{})`)
                //*
                        //*
                if (pageName === "main") fs.mkdir(`./src/images/${sectionName}`, { recursive: true }, err => {});
                else fs.mkdir(`./src/images/${pageName}/${sectionName}`, { recursive: true }, err => {});
            });
        }
        if (isString(sectionList)) {
            createFile(`./src/pages/${pageName}/${pageName}/${pageName}.js`)
            createFile(`./src/pages/${pageName}/${pageName}/${pageName}.scss`, styleTemplate)
            createFile(`./src/pages/${pageName}/${pageName}/${pageName}.html`, sectionTemplate)
            //*
            streamList.scripts.list.push(`import "../../pages/${pageName}/${pageName}/${pageName}.js";`)
            streamList.styles.list.push(`@import "../../pages/${pageName}/${pageName}/${pageName}";`)
            streamSectionList.list.push(`@@include("./${pageName}/${pageName}.html",{})`)
        }
        includeFile(streamSectionList.path, streamSectionList.list, '\n')
    });
    includeFile(streamList.scripts.path, streamList.scripts.list, '\n')
    includeFile(streamList.styles.path, streamList.styles.list, '\n')
}
