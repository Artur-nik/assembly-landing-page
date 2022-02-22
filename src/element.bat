set path=

set scss= scss/modules/elements

if not exist %scss%/_%path%.scss (
    cd. > %scss%/_%path%.scss
    (
        echo .%path% { 
        @echo.     
        echo }
    ) > %scss%/_%path%.scss

    echo @import '%path%'; >> %scss%/_index.scss
)