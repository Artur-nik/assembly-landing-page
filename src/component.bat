set path=slider

set scss= scss/components/%path%
set js= js/main/components/%path%

md scss\components\%path%
md js\main\components\%path%

if not exist %scss%/_%path%.scss (
    cd. > %scss%/_index.scss
    cd. > %scss%/_%path%.scss
    (
        echo .%path% { 
        @echo.     
        echo }
    ) > %scss%/_%path%.scss

    echo @import '%path%'; >> %scss%/_index.scss
    echo @import '%path%/index'; >> scss/components/_index.scss
)
if not exist %js%/%path%.js (
    cd. > %js%/%path%.js
    cd. > %js%/index.js
    (
        echo ^@@include("%path%.js",{}^)
        @echo.
    )  >> %js%/index.js
   ( 
       @echo.
       echo ^@@include("%path%/index.js",{}^)
   ) >> js/main/components/index.js
)


@FOR /F %%i in (component.txt) do (

    if not exist %scss%/_%%i.scss (
        cd. > %scss%/_%%i.scss
                (
        echo .%%i { 
        @echo.     
        echo }
        ) > %scss%/_%%i.scss
        echo @import '%%i'; >> scss/components/%path%/_index.scss
    )

    if not exist %js%/%%i.js (
        cd. > %js%/%%i.js
        echo ^@@include("%%i.js",{}^) >> %js%/index.js
    )
)