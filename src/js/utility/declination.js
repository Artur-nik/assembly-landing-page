export function _declination(number, text) {  
    number = Math.abs(number) % 100; 
    const n1 = number % 10;
    if (number > 10 && number < 20) { return text[2]; }
    if (n1 > 1 && n1 < 5) { return text[1]; }
    if (n1 == 1) { return text[0]; }
    return text[2];
}
//* _declination(число,  массив слов для склонения = ['поле', 'поля', 'полей'])