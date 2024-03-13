import {getNodeById} from "./modules/utils.js";
import clock from "./modules/clock.js";
import initMap from "./modules/map.js";

//CLOCK
setInterval(clock, 500)
//GEO
initMap();


















//DRAG AND DROP
const widgetIcons = document.querySelectorAll('.widgetIcon')
const widgets = document.querySelectorAll('.widget')
const workSpace = document.getElementById('workspace')
const sidebar = document.getElementById('sidebar')

widgetIcons.forEach(icon => {
    icon.addEventListener('dragstart', ()=>{
        let selected = icon
        workSpace.addEventListener('dragover', (event)=>{
            event.preventDefault()
        })
        workSpace.addEventListener('drop', ()=>{
            switch (selected.id) {
                case 'geoIcon':
                    const geoWidget = getNodeById(widgets,'map')
                    geoWidget.hidden=false
                    workSpace.appendChild(geoWidget)
                    break
                case 'weatherIcon':
                    const weatherWidget = getNodeById(widgets,'weatherWidget')
                    weatherWidget.hidden=false
                    workSpace.appendChild(weatherWidget)
                    break
                case 'timeIcon':
                    const timeWidget = getNodeById(widgets,'timeWidget')
                    timeWidget.hidden=false
                    workSpace.appendChild(timeWidget)
                    break
                case 'dicIcon':
                    const dicWidget = getNodeById(widgets,'dicWidget')
                    dicWidget.hidden=false
                    workSpace.appendChild(dicWidget)
                    break
            }
            selected.hidden=true
            selected=null
        })
    })
});

widgets.forEach(widget => {
    widget.addEventListener('dragstart', ()=>{
        let selected = widget
        sidebar.addEventListener('dragover', (event)=>{
            event.preventDefault()
        })
        sidebar.addEventListener('drop', ()=>{
            switch (selected.id) {
                case 'map':
                    const geoIcon = getNodeById(widgetIcons,'geoIcon')
                    geoIcon.hidden=false
                    sidebar.appendChild(geoIcon)
                    break
                case 'weatherWidget':
                    const weatherIcon = getNodeById(widgetIcons,'weatherIcon')
                    weatherIcon.hidden=false
                    sidebar.appendChild(weatherIcon)
                    break
                case 'timeWidget':
                    const timeIcon = getNodeById(widgetIcons,'timeIcon')
                    timeIcon.hidden=false
                    sidebar.appendChild(timeIcon)
                    break
                case 'dicWidget':
                    const dicIcon = getNodeById(widgetIcons,'dicIcon')
                    dicIcon.hidden=false
                    sidebar.appendChild(dicIcon)
                    break
            }
            selected.hidden=true
            selected=null
        })
    })
})





































