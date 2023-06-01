function createTab(id, studentName, projectName, videoUrl, description) {
  const divTab = document.createElement('div')
  divTab.className = 'tab'
  divTab.innerHTML = `
    <input class="input-menu" type="radio" id="rd${id}" name="rd">
    <label class="tab-label" for="rd${id}">
      <div>
        <div class="tab__student-name">${studentName}</div>
        <div class="tab__project-name">${projectName}</div>
      </div>
    </label>
    <div class="tab-content">
      <button class="button-as-link" onclick="loadProject('${id}')">${videoUrl}</button>
      <div>
      ${description}
      </div>
    </div>
  `
  return divTab
}

const apiEnabled = true

 const baseUrl = 'https://team-2-back.onrender.com'
//const baseUrl = 'http://localhost:3000'
const urls = {
  getProjects: `${baseUrl}/project/findProject`,
  saveProject: `${baseUrl}/project/{id}/assessment`,
}

function getProjects() {
  // Emula llamado a la API
  if (apiEnabled) {
    const user = getUser()
    const teacherEmail = encodeURIComponent(user.email)
    return fetch(`${urls.getProjects}?teachEmail=${teacherEmail}`)
      .then(result => {
        if (result.ok) {
          return result.json()
        }
      })
  } else {
    return Array(10).fill(0).map((item, index) => {
      if (index % 2 === 0) {
        return {
          id: index,
          studentName: 'Karen',
          studentLastName: 'Echavarria',
          studentEmail: "karen@mail.com",
          teachEmail: "Andrea@email.com",
          url: 'https://www.youtube.com/watch?v=RbT28X0wiRw',
          projectName: 'Google email domains',
          description: 'Video para configurar emil en google',
          createdAt: '2023-05-09T18:55:18.010+00:00'
        }
      } else {
        return {
          id: index,
          studentName: 'Karen',
          studentLastName: 'Echavarria',
          studentEmail: "karen@mail.com",
          teachEmail: "Andrea@email.com",
          url: 'https://www.youtube.com/watch?v=RbT28X0wiRw',
          projectName: 'Google email domains',
          description: 'Video para configurar emil en google',
          createdAt: '2023-05-09T18:55:18.010+00:00',
          assessment: {
            criticalThinking: {
              timestamp: '2:00',
              score: 5,
              comment: "nice"
            },
            problemSolving: {
              timestamp: '2:00',
              score: 5,
              comment: "nice"
            }
          }
        }
      }
  })
  }
}

let projects = []

function getUser() {
  try {
    return JSON.parse(localStorage.getItem('user'))
  } catch (e) {
    console.log(e.message)
    return { name: 'Unkown', email: 'user2@gmail.com' }
  }
}

async function init () {
  const user = getUser()
  document.getElementById("username").innerText = user.name
  console.log(user)
  projects = await getProjects()
  const tabsContainer = document.getElementById('tabs-container')
  for (const project of projects) {
    const tabElement = createTab(project._id, `${project.studentName} ${project.studentLastName}`, project.projectName, project.url, project.description)
    tabsContainer.appendChild(tabElement)
  }
}
init()




const videoContainer = document.getElementById("repro-video");
let evaluatedSkills = []

let selectedProject = -1
function loadProject(id) {
  const projectContainer = document.getElementById('project-section')
  projectContainer.classList.remove('hide')
  const project = projects.find(project => project._id == id)
  console.log(id)
  console.log(projects)
  selectedProject = id
  console.log(selectedProject)
  console.log(typeof selectedProject)
  loadYouTubeVideo(project.url)
  evaluatedSkills = []
  console.log(project)
}

function loadYouTubeVideo(url){
  const queryString = url.slice(url.indexOf('?'))
  const params = new URLSearchParams(queryString)
  const videoId = params.get('v')
  if (videoId != null) {
    const iframe = document.createElement("iframe");
    iframe.width = "100%";
    iframe.height = "445";
    iframe.src = `https://www.youtube.com/embed/${videoId}`;
    iframe.frameborder = "0";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowfullscreen = true;
    videoContainer.innerHTML = "";
    videoContainer.appendChild(iframe)
  }
}

// ***** estrellas

// check if there is a rating stars div on the page
if(document.querySelector(".starIcon1") != undefined){

  // initialize the rating stars list as a global variable to reuse it later
  let stars = [];

  // init the stars query selectors
  function starQueryInit(){
      // create the querySelector of each 5 stars and push it to the stars list
      for(let i=1; i <= 5; i++){
          stars.push(document.querySelector(".starIcon"+i));
      }
  }

  // remove the clickedStar class on every stars
  function removeClickedStar(){
      for(let i = 0; i < stars.length; i++){
          stars[i].classList.remove("clickedStar");
      }
  }

  // add the clickedStar function when clicked and check his radio button
  function addClickedStar(numStar){
      // clickedStar function when clicked
      for(let i = 0; i < numStar; i++){
          stars[i].classList.add("clickedStar");
      }
      // check his radio button
      document.querySelector("input[type=radio].star"+numStar).checked = true;
      let checkedValue = document.querySelector('input[name="comment[rating]"]:checked').value;
      // console.log(checkedValue);
  }

  // translate hover effect
  function translateHover(numStar, translateY){
      for(let i = 0; i < numStar; i++){
          stars[i].style.transform = translateY;
      }
  }

  function createRatingEventListeners(){
      // create the translateY up and down values
      let translateLst = ["translateY(-5px)", "translateY(0px)"];
      // iterate over the stars and add event listeners
      for(let i = 0; i < stars.length; i++){
          // set the number of star value
          let numStar = i+1;

          // hover effect translateY up and down
          // add the up translateY hover effect
          stars[i].addEventListener("mouseover", ()=>{
              translateHover(numStar, translateLst[0]);
          });
          // add the up translateY hover effect
          stars[i].addEventListener("mouseout", ()=>{
              translateHover(numStar, translateLst[1]);
          });

          // click event listener (change color and check the radio button)
          stars[i].addEventListener("click", ()=> {
              // remove all the clickedStar
              removeClickedStar();
              // add clickedStar and check his radio button
              addClickedStar(numStar);
          });
      }
  }

  // init the stars query selectors
  starQueryInit();
  // create the events listeners
  createRatingEventListeners();
}


let habiliOptions = document.querySelector(".habilidades-select");

const btnAdd = document.getElementById("btn-añadir");

function getStarCalification () {
  const inputs = document.getElementsByName('comment[rating]')
  for (const input of inputs) {
    if (input.checked) {
      return Number(input.value)
    }
  }
  return 0;
}

btnAdd.addEventListener('click', () => {
  const habiliName = habiliOptions.options[habiliOptions.selectedIndex].text;
  const time = document.getElementById('input-min').value
  const stars = getStarCalification()
  const comments = document.getElementById('coments').value
  const evaluatedSkill = {
    habiliName,
    time,
    stars,
    comments
  }
  createSection(habiliName, stars)
  evaluatedSkills.push(evaluatedSkill)
  console.log(habiliName)
  console.log(time)
})

function removeSkill(habiliName) {
  evaluatedSkills = evaluatedSkills.filter(evaluatedSkill => evaluatedSkill.habiliName != habiliName)
  const skillId = getSkillId(habiliName)
  const row = document.getElementById(skillId)
  if (row != null) {
    row.remove()
  }
 }

function getSkillId(habiliName) {
  return `rated-skill-${habiliName.toLowerCase().split(' ').join('-')}`
}

function createSection(habiliName,caliStar ) {
  const divSection = document.createElement('div')
  divSection.id = getSkillId(habiliName)
  divSection.innerHTML = `
  <div class= "fila-evaluacion">
  <div class="habilidades-name">${habiliName}</div>
  <div class="calificacion-start">
  <i class="${caliStar >= 1 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 2 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 3 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 4 ? 'clickedStar' : ''} fa fa-star"></i>
  <i class="${caliStar >= 5 ? 'clickedStar' : ''} fa fa-star"></i>
  </div>
  <button type="button" class="remove-skill" onclick="removeSkill('${habiliName}')">
    <i class="fa-regular fa-circle-xmark"></i>
  </buton>
  </div>
  
  `
  const container = document.getElementsByClassName('section-evaluacion')[0]
  container.appendChild(divSection)
}



function createPDF(){
  var pdf = new jspdf.jsPDF();
  const image = new Image()
  image.src = '../images/logo-edvisto-fondo.png'
  pdf.text(40,20,"Resultados de Evaluación");
  pdf.addImage(image,10,3,26,26)
  const div = document.createElement('div')


  let tableContent = ''
  const tdStyle = 'border: 0.5px solid #979797; background: #D3D9DF; padding: 1px; color: #555555;'
  for (const evaluatedSkill of evaluatedSkills) {
    tableContent +=`
      <tr >
        <td style="${tdStyle}">${evaluatedSkill.habiliName}</td>
        <td style="${tdStyle}">${evaluatedSkill.time}</td>
        <td style="${tdStyle}">${evaluatedSkill.stars}</td>
      </tr>
      <tr>
        <td style="${tdStyle}" colspan="3">${evaluatedSkill.comments}</td>
      </tr>
    `
  }
  div.innerHTML = `<table>
   ${tableContent}
  </table>`
  image.onload = function() {
    pdf.html(div, {
      callback(doc) {
        doc.save('mipdfhtml.pdf')
      },
      x: 15,
      y: 30,
      width: 170, //target width in the PDF document
      windowWidth: 650 //window width in CSS pixels
    })    
  }
}
function saveEvaluation () {
  console.log(urls.saveProject)
  console.log(selectedProject)
  
 fetch(urls.saveProject.replace('{id}', selectedProject),
  {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assessments: evaluatedSkills.map((evaluatedSkill) => ({
        skill: evaluatedSkill.habiliName,
        timestamp: evaluatedSkill.time,
        score: evaluatedSkill.stars,
        comment: evaluatedSkill.comments
      }))
    })
  })
}
const btnEnd = document.getElementById("btn-finalizar");
btnEnd.addEventListener('click', () => {
  saveEvaluation()
  Swal.fire({
    imageUrl: '../images/Mesa_de_trabajo_1.png',
    title: '¡Evaluación Finalizada con éxito!',
    showCloseButton: true,
    imageWidth: 400,
    imageHeight: 400,
    confirmButtonText: 'Ver'
  })
    .then((result) => {
    if (result.isConfirmed) {
      createPDF()
    }
  })
    
})

const searcher = document.getElementById('searcher')
searcher.addEventListener('keyup', () => {
  const keyValue = searcher.value.toLowerCase().trim()
  const splittedValues = keyValue.split(' ')
  const filteredProjects = keyValue === '' ? projects : projects.filter(project => {
    const firstName = project.studentName.toLowerCase();
    const lastName = project.studentLastName.toLowerCase();
    for (const searchValue of splittedValues) {
      if (!firstName.includes(searchValue) && !lastName.includes(searchValue)) {
        return false
      }
    }
    return true
  })
  const tabsContainer = document.getElementById('tabs-container')
  tabsContainer.innerHTML = ''
  for (const project of filteredProjects) {
    const tabElement = createTab(project._id, `${project.studentName} ${project.studentLastName}`, project.projectName, project.url, project.description)
    tabsContainer.appendChild(tabElement)
  }
})
