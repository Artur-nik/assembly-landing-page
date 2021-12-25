set path= section

set scss= scss/%path%/
set template= template/%path%/
set js= js/main/%path%/
set images= images\


if not exist %scss%_index.scss (
cd. > %scss%_index.scss
)

@FOR /F %%i in (files.txt) do (
    cd. > %scss%_%%i.scss
    (
    echo .%%i { 
    echo     min-height: 100vh;
    echo }
    ) > %scss%_%%i.scss
    echo @import '%%i'; >> %scss%_index.scss
)
if not exist %template%_index.html (
cd. > %template%_index.html
)
@FOR /F %%i in (files.txt) do (
    cd. > %template%_%%i.html
    (   
        echo ^<section id^=^"^%%i^" class^=^"%%i^"^>
        @echo.
        echo ^<^/section^>
    ) > %template%_%%i.html
    echo @@include(^"^_^%%i^.html^"^,{}^)^ >> %template%_index.html
)

if not exist %js%index.js (
cd. > %js%index.js
)
@FOR /F %%i in (files.txt) do (
    cd. > %js%%%i.js
    echo @@include(^"^%%i^.js^"^,{}^)^ >> %js%index.js
)

@FOR /F %%i in (files.txt) do  md %images%%%i