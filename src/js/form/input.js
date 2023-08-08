import { validInput } from "../utility/validInput"

//*
$('[data-input]').each((index, $input)=>{
    //*
    const $box = ($($input).parents('[data-input-box]').length) ? $($input).parents('[data-input-box]')[0] : false
    //*
    inputSetup($input, $box)
})

//*
function inputSetup($input, $box) {
    //*
    if ($input.__input)return
    $input.__input = true
    //*
    const $validBox = ($box) ? $($box) : $($input)
    //*
    $($input).on('change focus',(e)=>{
        if ($input.required) {
            $validBox.removeClass('_required')
        }
        $validBox.removeClass('_error' + ' _' + $input.type)
    })
    //*
    $($input).on('inputRequired',(e)=>{
        if ($input.required && !validInput($input, $box)) {
            $validBox.addClass('_required')
        }
    })
    
    //*
    $($input).on('focusout',(e)=>{ 
        if ($input.required) { 
            if ($input.__mask !== undefined && !$input.__mask) {            
                setTimeout(function () {
                    $validBox.addClass('_required')
                }, 0);
            }
            else if ($input.value.length === 0) {
                $validBox.addClass('_required')
            }
            else if (!validInput($input, $box)) {
                $validBox.addClass('_error' + ' _' + $input.type)
            }
        }
        else if (!validInput($input, $box)) {
            if (!($input.__mask !== undefined && !$input.__mask) && $input.value.length !== 0) {
                $validBox.addClass('_error' + ' _' + $input.type)
            }
        }
    })    
}
