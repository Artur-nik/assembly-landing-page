set scss= scss/template/page/
set template= template/page/
set js= js/main/page/

set images= images\

md scss\template\page
md template\page
md js\main\page

if not exist %scss%_index.scss (
    cd. > %scss%_index.scss
)
if not exist %js%index.js (
    cd. > %js%index.js
)

@FOR /F %%i in (page.txt) do (

    md scss\template\page\%%i
    if not exist %scss%%%i/_index.scss (
        cd. > %scss%%%i/_index.scss
    )
    if not exist %scss%%%i/_%%i.scss (
        cd. > %scss%%%i/_%%i.scss
                (
        echo .%%i { 
        @echo.     
        echo }
        ) > %scss%%%i/_%%i.scss
        echo @import '%%i'; >> scss/template/page/%%i/_index.scss
        echo @import '%%i/index'; >> scss/template/page/_index.scss
    )

    md template\page\%%i
    if not exist %template%%%i.html (
        cd. > %template%%%i/index.html
        cd. > %template%%%i.html
        (   
            echo ^<!DOCTYPE html^>
            echo ^<html lang="ru-RU"^>
            echo ^<head^>
            echo     ^<meta charset="UTF-8"^>
            echo     ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^>
            echo     ^<title^>%%i^</title^>
            echo     ^@@include("../base/favicon.html",{}^)
            echo     ^<link rel="stylesheet" type="text/css" href="css/main.css"^>
            echo     ^<meta name="format-detection" content="telephone=no"^>
            echo ^</^head^>
            echo ^<body^>
            @echo.
            echo     ^@@include("../menu/menu-modal.html",{}^)
            @echo.
            echo     ^@@include("../base/header.html",{}^)
            @echo.
            echo     ^@@include("%%i/index.html",{}^)
            @echo.
            echo     ^@@include("../base/footer.html",{}^)
            @echo.
            echo     ^@@include("../modal/modal-form.html",{}^)
            echo     ^@@include("../modal/modal-politics.html",{}^)
            echo     ^@@include("../modal/modal-video.html",{}^)
            @echo.
            echo     ^<script^ src="js/libraries/libraries.js"^>^</script^>
            echo     ^<script^ src="js/main/main.js"^>^</script^>
            @echo.
            echo ^</body^>
            echo ^</html^>
        ) > %template%%%i.html
    )

    md js\main\page\%%i
    if not exist %js%%%i/index.js (
        cd. > %js%%%i/index.js
    )
    if not exist %js%%%i/%%i-page.js (
        cd. > %js%%%i/%%i-page.js
        echo ^@@include("%%i-page.js",{}^) >> %js%%%i/index.js
        echo ^@@include("%%i/index.js",{}^) >> %js%index.js
    )

    if not exist %images%%%i (
        md %images%%%i
    )
)