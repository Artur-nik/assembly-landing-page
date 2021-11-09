@FOR /F %%i in (files.txt) do (
    cd. > scss/section/_%%i.scss
    echo .%%i {} > scss/section/_%%i.scss
)

@FOR /F %%i in (files.txt) do (
    cd. > template/_%%i.html
    echo ^<section id^=^"^%%i^" class^=^"%%i^"^>^<^/section^> > template/_%%i.html
)

@FOR /F %%i in (files.txt) do (
    cd. > js/main/section/%%i.js
)

@FOR /F %%i in (files.txt) do  md images\%%i
