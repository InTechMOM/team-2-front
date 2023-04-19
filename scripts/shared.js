const email = document.getElementsByClassName("v-email");

emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
function isValidEmail (email) {
    return emailRegex.test(email)
}




