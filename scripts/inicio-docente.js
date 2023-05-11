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
      <a href="${videoUrl}">URL al video</a>
      <div>
      ${description}
      </div>
    </div>
  `
  return divTab
}

function getTabs() {
  return Array(15).fill(0).map((item, index) => ({
    id: index,
    studentName: 'Martina Zambrano',
    projectName: 'In tech mom - inicio docente',
    videoUrl: 'https://www.youtube.com/watch?v=afo7Ynw-BX8',
    description: 'Descripcion: Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis voluptas illo repudiandae deleniti possimus fugit reiciendis voluptatibus libero autem tenetur, quos aspernatur amet, porro, quibusdam sint eum accusantium explicabo! Excepturi.'
  }))
}

function loadTabs () {
  const tabs = getTabs()
  const tabsContainer = document.getElementById('tabs-container')
  for (const tab of tabs) {
    console.log(tab)
    const tabElement = createTab(tab.id, tab.studentName, tab.projectName, tab.videoUrl, tab.description)
    tabsContainer.appendChild(tabElement)
  }
}

loadTabs()