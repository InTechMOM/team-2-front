const baseUrl = 'https://team-2-back.onrender.com'
//const baseUrl = 'http://localhost:3000'
const urls = {
  createUser: `${baseUrl}/users`,
}
const firstname = document.getElementById("firstname-id");
const lastname = document.getElementById("lastname-id");
const email = document.getElementById("email-id");
function rol(){
    return document.getElementById("student-id").checked ? 'student' : 'teacher'
}
function register(){
    return fetch( urls.createUser ,
      {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
            "name": firstname.value.trim(),
            "lastName": lastname.value.trim(),
            "email": email.value.trim(),
            "rol": rol()
         

      }),
    })
   
  }
  const btnRegister = document.getElementById("btn-registro");
  btnRegister.addEventListener('click', () => {
    register()
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
            throw new Error('Error')
        }
      })
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data))
        if (rol() === 'student') {
            window.location.href ="./carga-video.html"
        } else {
            window.location.href ="./inicio-docente.html"
        }
      })
  })