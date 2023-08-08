export function validInput($input, box) {
    //*
    if ($input.__mask !== undefined) {
        return $input.__mask
    }
    else if ($input.type === 'radio') {
        //*
        if (!$input.required) {
            if ($input.value.length) {
                return true; 
            }
            else {
                return false;
            }
        }
        //*
        let radioList = document.querySelectorAll('input[type="radio"][name="' + $input.name + '"]');
        //*
        if (box && box instanceof HTMLElement) {
            radioList = box.querySelectorAll('input[type="radio"][name="' + $input.name + '"]');
        }
        for (var i = 0; i < radioList.length; i++) { 
         
            if (radioList[i].checked) {   
                if (radioList[i].value.length) {
                    return true; 
                }
                else {
                    return false;
                }
            }
        }
        return false;
    }
    else if ($input.type === 'checkbox') {
        //*
        if (!$input.required) {
            return true
        }
        return $input.checked
    }
    else if ($input.type === 'email') {
        if ($input.validity.patternMismatch) {
            return $input.validity.valid
        }
        if ($input.value.length !== 0 && $input.validity.valid) {
            return true
        }
        if (!$input.required && $input.validity.valid) {
            return true
        }
        return false
    }
    else if ($input.type === 'number') {
        if ($input.validity.patternMismatch) {
            return $input.validity.valid
        }
        if ($input.value.length !== 0 && !$input.validity.badInput) {
            return true
        }
        if (!$input.required && !$input.validity.badInput) {
            return true
        }
        return false
    }
    else {
        if ($input.validity.patternMismatch) {
            return $input.validity.valid
        }
        return !!$input.value.length 
    }
}