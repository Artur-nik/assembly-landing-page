import { checkIncludes } from "./util/util.js";
import { ProjectFileSystem} from "./fileSystem/ProjectFileSystem.js";

export default async function addFileCompanents(){
    ProjectFileSystem({
        rootPath: './src/components/',
        getData: './src/components/components.json',
        extensions: {
            scripts: {
                ext: 'js',
                template: '',
                include: { 
                    path: './src/js/paths/components.g.js', 
                    start: 'import "../../components/',
                    end: '";',
                    ext: '.js'
                }
            },
            styles: {
                ext: 'scss',
                template: '',
                include: {
                    path: './src/scss/paths/components.g.scss',
                    start: '@import "../../components/',
                    end: '";',
                }
            }, 
        },
        setup(file, config, addFile) {
           
            const {relativePath, fileMod, folderMod, extName, nameChanged, folder, name, ext, extIndex } = file
            if (fileMod || folderMod) {
                //* isInclude
                let isInclude = checkIncludes(ext, folderMod ? folderMod.base : false, fileMod ? fileMod.base : false)
//  
                //? FOLDERMOD
                if ((folderMod.base && folderMod.base.includes('script')   && extName === 'scripts' ) ||
                    (folderMod.base && folderMod.base.includes('style')    && extName === 'styles'  ))  {
                    
                    addFile({filePath: `${relativePath}${name}.${ext}`, includePath:  isInclude})
                }
                if (folderMod.base && folderMod.base.includes('json')      && extIndex === 0) {
                    addFile({filePath: `${relativePath}${name}.json`, includePath:  false})
                }
                if (folderMod.base && folderMod.base.includes('snippet')      && extIndex === 0) {
                    addFile({filePath: `${relativePath}${name}.snippet.html`, includePath:  false})
                }
                //? FILEMOD
                if  ((fileMod.base && fileMod.base.includes('script')   && extName === 'scripts' ) ||
                     (fileMod.base && fileMod.base.includes('style')    && extName === 'styles'  ))  {
                    
                    addFile({filePath: `${relativePath}${name}.${ext}`, includePath:  isInclude})
                }
                if (fileMod.base && fileMod.base.includes('snippet')      && extIndex === 0) {
                    addFile({filePath: `${relativePath}${name}.snippet.html`, includePath:  false})
                }
                if (fileMod.base && fileMod.base.includes('json')       && extIndex === 0) {
                    addFile({filePath: `${relativePath}${name}.json`, includePath:  false})
                }
                //* DEFAULT
                if (fileMod.base && fileMod.base.includes('default')) {
                    addFile({filePath:`${relativePath}${name}.${ext}`, includePath: isInclude})
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