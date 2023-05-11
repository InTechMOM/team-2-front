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
      <button class="button-as-link" onclick="loadProject(${id})">${videoUrl}</button>
      <div>
      ${description}
      </div>
    </div>
  `
  return divTab
}

function getProjects() {
  // Emula llamado a la API
  return Array(15).fill(0).map((item, index) => ({
    id: index,
    studentName: 'Martina Zambrano',
    projectName: 'In tech mom - inicio docente',
    videoUrl: 'https://www.youtube.com/watch?v=afo7Ynw-BX8',
    description: 'Descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptas illo repudiandae deleniti possimus fugit reiciendis voluptatibus libero autem tenetur, quos aspernatur amet, porro, quibusdam sint eum accusantium explicabo! Excepturi.'
  }))
}

let projects = []

function loadProjectsOnTab () {
  projects = getProjects()
  const tabsContainer = document.getElementById('tabs-container')
  for (const project of projects) {
    const tabElement = createTab(project.id, project.studentName, project.projectName, project.videoUrl, project.description)
    tabsContainer.appendChild(tabElement)
  }
}

loadProjectsOnTab()



const videoContainer = document.getElementById("repro-video");

function loadProject(id) {
  const projectContainer = document.getElementById('project-section')
  projectContainer.classList.remove('hide')
  const project = projects.find(project => project.id == id)
  loadYouTubeVideo(project.videoUrl)
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