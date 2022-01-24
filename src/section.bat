set path=section

set scss= scss/template/%path%/
set template= template/%path%/
set js= js/main/%path%/

set images= images\

md scss\%path%
md template\%path%
md js\main\%path%

if not exist %scss%_index.scss (
    cd. > %scss%_index.scss
)
if not exist %template%_index.html (
    cd. > %template%_index.html
)

if not exist %js%index.js (
    cd. > %js%index.js
)

@FOR /F %%i in (section.txt) do (
    if not exist %scss%_%%i.scss (
        cd. > %scss%_%%i.scss
        (
        echo .%%i { 
        echo     border-top: 1px solid red;
        echo     min-height: 100vh;
        echo }
        ) > %scss%_%%i.scss
        echo @import '%%i'; >> %scss%_index.scss
    )

    if not exist %template%_%%i.html (
        cd. > %template%_%%i.html
        (   
            echo ^<section id="%%i" class="%%i"^>
            echo     ^<div class="container"^>
            echo         ^<h2 class="%%i__title title title--size-"^>^</h2^>
            echo     ^</div^>
            echo ^</section^>
            
        ) > %template%_%%i.html
        echo ^@@include("_%%i.html",{}^) >> %template%_index.html
    )
    
    if not exist %js%%%i.js (
        cd. > %js%%%i.js
        echo ^@@include("%%i.js",{}^) >> %js%index.js
    )

    if not exist %images%%%i (
        md %images%%%i
    )
)