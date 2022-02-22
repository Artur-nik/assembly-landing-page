set path=slider

set scss= scss/components/%path%

if not exist %scss%/_%path%.scss (
    cd. > %scss%/_index.scss
    cd. > %scss%/_%path%.scss
    (
        echo .%path% { 
        @echo.     
        echo }
    ) > %scss%/_%path%.scss

    echo @import '%path%/index'; >> scss/components/_index.scss
)
