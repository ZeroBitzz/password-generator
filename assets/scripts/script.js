// PREVENTS THE PAGE FROM RELOADING WHEN YOU SUBMIT THE FORM
let form = document.getElementById("password-form");
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

// CHARACTER ARRAYS
let specialCharArr = ["!", "\"", "#", "$", "%", "&", "\'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "=", ">", "?", "@", "[", "]", "\\", "^", "_", "`", "{", "}", "~"]
let lowerCharArr = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
let upperCharArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
let numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9]

// MAIN FUNCTION
function createPassword(){
    let lowerCheckbox = document.getElementById("lowercase-checkbox").checked
    let upperCheckbox = document.getElementById("uppercase-checkbox").checked
    let specialCheckbox = document.getElementById("special-char-checkbox").checked
    let numValCheckbox = document.getElementById("num-val-checkbox").checked
    let lengthInput = document.getElementById("length-input").value
    let statusText = document.getElementById("status-text")
    let passwordText = document.getElementById("password-text")
    let strTestLink = document.getElementById("str-test-link")
    let newPassword = ''
    let charSelectArr = []
    // checks if length is valid and checkboxes are selected. else displays error message if length was not in correct range
    if(parseInt(lengthInput) >= 8 && parseInt(lengthInput) <= 128){
        // makes sure at least one checkbox is selected
        if (lowerCheckbox || upperCheckbox || specialCheckbox || numValCheckbox) {
            
            // checks which checkboxes are selected and adds them to collective array accordingly
            lowerCheckbox ? charSelectArr = charSelectArr.concat(lowerCharArr) : null
            upperCheckbox ? charSelectArr = charSelectArr.concat(upperCharArr) : null
            specialCheckbox ? charSelectArr = charSelectArr.concat(specialCharArr) : null
            numValCheckbox ? charSelectArr = charSelectArr.concat(numArr) : null
            console.log('charSelectArr: ' + charSelectArr)
            
            // creates password selecting random values from collective array(charSelectArr)
            for(let i=0; i<lengthInput; i++){
                newPassword += charSelectArr[Math.floor(Math.random() * charSelectArr.length)]
            }
        }else{
            statusText.innerHTML = 'Please select a checkbox'
            statusText.style.display = 'flex'
            return 
        }
        
        // checks if letters or any unusable characters entered length field
        if(newPassword === ''){
            statusText.innerHTML = 'Incorrect value entered for length'
            statusText.style.display = 'flex'
        }else{
            // resizes password element style if length was 40 or more characters long
            if(newPassword.length >= 40){
                passwordText.style.fontSize = "15px"
                passwordText.innerHTML = newPassword
            }else{
                passwordText.style.fontSize = "40px"
                passwordText.innerHTML = newPassword
            }
            statusText.innerHTML = 'Password made and copied to clipboard!'
            statusText.style.display = 'flex'
            strTestLink.style.display = 'flex'
            // copies password to clipboard
            navigator.clipboard.writeText(newPassword)
        }

    }else{
        statusText.innerHTML = 'Incorrect value entered for length'
        statusText.style.display = 'flex'
    }
}

// adds event listener to the submit form button so the javascript runs when you enter your password settings on the page
submitForm = document.getElementById("submit-form")
submitForm.addEventListener("click", createPassword)