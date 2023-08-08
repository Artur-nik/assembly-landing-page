import { checkIncludes } from "./util/util.js";
import { ProjectFileSystem} from "./fileSystem/ProjectFileSystem.js";


export default async function addFileTemplate(){
    ProjectFileSystem({
        rootPath: './src/template/',
        getData: './src/template/template.json',
        extensions: {
            scripts: {
                ext: 'js',
                template: '',
                include: { 
                    path: './src/js/paths/template.g.js', 
                    start: 'import "../../template/',
                    end: '";',
                    ext: '.js'
                }
            },
            styles: {
                ext: 'scss',
                template: '',
                include: {
                    path: './src/scss/paths/template.g.scss',
                    start: '@import "../../template/',
                    end: '";',
                }
            }, 
            template: {
                ext: 'html',
            }, 
        },
        setup(file, config, addFile) {
            //*
            const {relativePath, fileMod, folderMod, extName, nameChanged, folder, name, ext, extIndex } = file
            //*
            if (fileMod || folderMod) {
                        
                //* isInclude
                let isInclude = checkIncludes(ext, folderMod ? folderMod.base : false, fileMod ? fileMod.base : false)
                //? FOLDERMOD
                if ((folderMod.base && folderMod.base.includes('template') && extName === 'template') ||
                    (folderMod.base && folderMod.base.includes('script')   && extName === 'scripts' ) ||
                    (folderMod.base && folderMod.base.includes('style')    && extName === 'styles'  ))  {
                    addFile({filePath: `${relativePath}${folderMod.base.includes('no-folder') ? '' : name + '/'}${name}.${ext}`, includePath:  isInclude})
                }
                if (folderMod.base && folderMod.base.includes('json')      && extIndex === 0) {
                    addFile({filePath: `${relativePath}${fileMod.base.includes('folder') ? (name + '/') : ''}${name}.json`, includePath:  false})
                }
                //? FILEMOD
                if  ((fileMod.base && fileMod.base.includes('template') && extName === 'template') ||
                     (fileMod.base && fileMod.base.includes('script')   && extName === 'scripts' ) ||
                     (fileMod.base && fileMod.base.includes('style')    && extName === 'styles'  ))  {
                    addFile({filePath: `${relativePath}${fileMod.base.includes('folder') ? (name + '/') : ''}${name}.${ext}`, includePath:  isInclude})
                }
                if (fileMod.base && fileMod.base.includes('json')       && extIndex === 0) {
                    addFile({filePath: `${relativePath}${fileMod.base.includes('folder') ? (name + '/') : ''}${name}.json`, includePath:  false})
                }
                if (fileMod.base && fileMod.base.includes('folder')) {
                    addFile({filePath:`${relativePath}${name}/${name}.${ext}`, includePath: isInclude})
                }
                //* DEFAULT
                if (fileMod.base && fileMod.base.includes('default')) {
                    addFile({filePath:`${relativePath}${fileMod.base.includes('no-folder') ? '' : name + '/'}${name}.${ext}`, includePath: isInclude})
                }
            }
            else if (nameChanged) {
                return
            }
            else {
                addFile(`${relativePath}${name}.${ext}`)
            }
        }
    })
}