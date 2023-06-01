const email = document.getElementsByClassName("v-email");

emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
function isValidEmail (email) {
    return emailRegex.test(email)
}

let dropdownOpened = false
function collapseDropdown() {
    const dropdown = document.getElementById('dropdown')
    const collpaseButton = document.getElementById('collpase-button')
    dropdownOpened = !dropdownOpened
    console.log(dropdown)
    if (dropdownOpened) {
        dropdown.classList.remove('hide')
        collpaseButton.classList.add('fa-rotate-180')
    } else {
        dropdown.classList.add('hide')
        collpaseButton.classList.remove('fa-rotate-180')
    }
}

function disconnect() {
    window.location = '/team-2-front/index.html'
}
