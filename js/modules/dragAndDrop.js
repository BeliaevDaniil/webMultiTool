import {getNodeById} from "./utils.js";

function setUpDragAndDrop(){
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
                if (selected!==null) {
                    switch (selected.id) {
                        case 'geoIcon':
                            const geoWidget = getNodeById(widgets,'mapWidget')
                            geoWidget.hidden=false
                            workSpace.appendChild(geoWidget)
                            shakeAnimation(geoWidget)
                            break
                        case 'weatherIcon':
                            const weatherWidget = getNodeById(widgets,'weatherWidget')
                            weatherWidget.hidden=false
                            workSpace.appendChild(weatherWidget)
                            shakeAnimation(weatherWidget)
                            break
                        case 'timeIcon':
                            const timeWidget = getNodeById(widgets,'timeWidget')
                            timeWidget.hidden=false
                            workSpace.appendChild(timeWidget)
                            shakeAnimation(timeWidget)
                            break
                        case 'dicIcon':
                            const dicWidget = getNodeById(widgets,'dicWidget')
                            dicWidget.hidden=false
                            workSpace.appendChild(dicWidget)
                            shakeAnimation(dicWidget)
                            break
                    }
                    selected.hidden=true
                    selected=null
                }
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
                if (selected!==null){
                    switch (selected.id) {
                        case 'mapWidget':
                            const geoIcon = getNodeById(widgetIcons,'geoIcon')
                            geoIcon.hidden=false
                            sidebar.appendChild(geoIcon)
                            shakeAnimation(geoIcon)
                            break
                        case 'weatherWidget':
                            const weatherIcon = getNodeById(widgetIcons,'weatherIcon')
                            weatherIcon.hidden=false
                            sidebar.appendChild(weatherIcon)
                            shakeAnimation(weatherIcon)
                            break
                        case 'timeWidget':
                            const timeIcon = getNodeById(widgetIcons,'timeIcon')
                            timeIcon.hidden=false
                            sidebar.appendChild(timeIcon)
                            shakeAnimation(timeIcon)
                            break
                        case 'dicWidget':
                            const dicIcon = getNodeById(widgetIcons,'dicIcon')
                            dicIcon.hidden=false
                            sidebar.appendChild(dicIcon)
                            shakeAnimation(dicIcon)
                            break
                    }
                    selected.hidden=true
                    selected=null
                }
            })
        })
    })
}

function shakeAnimation(object){
    object.classList.add('shake')
    setTimeout(() => {
        object.classList.remove('shake');
    }, 1000);
}


export default setUpDragAndDrop

