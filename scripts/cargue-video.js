const btnCargar = document.getElementById("btn-cargar");
btnCargar.addEventListener('click', loadYouTubeVideo,);
const titleInput = document.getElementById("info__title");
const descriptionInput = document.getElementById("info__description");
const linkInput = document.getElementById("project-info__link");
const videoContainer = document.getElementById("project-video");
const emailTeacher = document.getElementById("email_teacher");

const user = JSON.parse(localStorage.getItem('user'))

async function init () {
  evaluations = await getEvaluations()
  const tabsContainer = document.getElementById('tabs-evaluacion')
  for (const evaluation of evaluations) {
    const tabElement = createTab(evaluation._id, evaluation)
    tabsContainer.appendChild(tabElement)
  }
  document.getElementById("username").innerText = user.name
  document.getElementById("info__first_name").innerText = user.name
  document.getElementById("info__last_name").innerText = user.lastName
  document.getElementById("info__email").innerText = user.email
  console.log(user)
}
const baseUrl = 'https://team-2-back.onrender.com'
//const baseUrl = 'http://localhost:3000'
const urls = {
  createdProject: `${baseUrl}/project/createVideo` ,
  getEvaluations: `${baseUrl}/project/findProject`
}


function loadYouTubeVideo(){
  // https://www.youtube.com/watch?v=OWKXEJN67FE
  // https://www.youtube.com/embed/9N9opF-PK5k
  // https://www.youtube.com/watch?v=9N9opF-PK5k
  // const youtubeUrl = 'https://www.youtube.com/watch?v=OWKXEJN67FE&t=4'
  const url = linkInput.value;
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



function saveProject(){
  return fetch( urls.createdProject,
    {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
          "studentName": user.name,
          "studentLastName": user.lastName,
          "studentEmail": user.email,
          "teachEmail": emailTeacher.value.trim(),
          "url": linkInput.value.trim(),
          "projectName": titleInput.value.trim(),
          "description": descriptionInput.value.trim()
    }),
  })
 
}
const btnSave = document.getElementById("btn-guardar");
btnSave.addEventListener('click', () => {
  saveProject()
    .then(response => {
      if (response.ok) {
        emailTeacher.value = ''
        linkInput.value = ''
        titleInput.value = ''
        descriptionInput.value = ''
        videoContainer.innerHTML = ''
      }
    })
})


function getEvaluations() {   
    const email = user.email
    return fetch(`${urls.getEvaluations}?studentEmail=${email}`)
      .then(result => {
        if (result.ok) {
          return result.json()
        }
      })
    }

 function createTab(id, project) {
  const divTab = document.createElement('div')
  const qualified = project.assessments != null && project.assessments.length > 0
  divTab.className = 'tab'
  divTab.innerHTML = `
  <input class="input-menu" type="radio" id="rd${id}" name="rd">
  <label class="tab-label" for="rd${id}">
    <div>
      <div class="tab__project-name">${project.projectName} - ${qualified ? 'CALIFICADO' : ''}</div>
    </div>
  </label>
  <div class="tab-content">
    <div>
    ${project.description}
    </div>
    <div> ${qualified ?  `<button type="button" class="button-as-link" onclick="createPDF('${id}')"> Ver Calificacion</button>` : '' }</div>
    `
   
  return divTab
}

function createPDF(projectId){
  const project = evaluations.find(project => project._id === projectId)
  var pdf = new jspdf.jsPDF();
  const image = new Image()
  image.src = '../images/logo-edvisto-fondo.png'
  pdf.text(40,20,"Resultados de Evaluación");
  pdf.addImage(image,10,3,26,26)
  const div = document.createElement('div')
  let tableContent = ''
  const tdStyle = 'border: 0.5px solid #979797; background: #D3D9DF; padding: 1px; color: #555555; width:150px;'
  evaluacion = project.assessments;
  console.log(evaluacion)
  for (const skill of evaluacion) {
    if (skill != null) 
    {
      tableContent +=`
        <tr >
          <td style="${tdStyle}">${skill.skill}</td>
          <td style="${tdStyle}">${skill.timestamp}</td>
          <td style="${tdStyle}">${skill.score}</td>
        </tr>
        <tr>
          <td style="${tdStyle}" colspan="3">${skill.comment}</td>
        </tr>
      `
    }
  }
  div.innerHTML = `<table>
   ${tableContent}
  </table>`
  image.onload = function() {
    pdf.html(div, {
      callback(doc) {
        const url = doc.output('datauri')
        const pdfContainer = document.getElementById('pdf-container')
        const iframe = document.createElement('iframe')
        iframe.width = "100%";
        iframe.height = "445";
        iframe.src = url;
        iframe.frameborder = "0";
        // iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowfullscreen = true;
        iframe.title = "Evaluacion"
        pdfContainer.innerHTML = ''
        pdfContainer.appendChild(iframe)
      },
      x: 15,
      y: 30,
      width: 170, //target width in the PDF document
      windowWidth: 650 //window width in CSS pixels
    })    
  }
}

init()

