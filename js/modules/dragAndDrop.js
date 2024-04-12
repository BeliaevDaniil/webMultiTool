import {getNodeById} from "./utils.js";


/**
 * Sets up drag and drop functionality for widgets and icons.
 */
function setUpDragAndDrop(){
    const widgetIcons = document.querySelectorAll('.widgetIcon')
    const widgets = document.querySelectorAll('.widget')
    const workSpace = document.getElementById('workspace')
    const sidebar = document.getElementById('sidebar')


    /**
     * Sets up drag and drop for widget icons.
     */
    widgetIcons.forEach(icon => {
        icon.addEventListener('dragstart', ()=>{
            let selected = icon
            selected.classList.add('blur')
            workSpace.addEventListener('dragover', (event)=>{
                event.preventDefault()
            })
            workSpace.addEventListener('drop', ()=>{
                if (selected!==null) {
                    selected.classList.remove('blur')
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
    })


    /**
     * Sets up drag and drop for widgets.
     */
    widgets.forEach(widget => {
        widget.addEventListener('dragstart', ()=>{
            let selected = widget
            selected.classList.add('blur')
            sidebar.addEventListener('dragover', (event)=>{
                event.preventDefault()
            })
            sidebar.addEventListener('drop', ()=>{
                if (selected!==null){
                    selected.classList.remove('blur')
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


/**
 * Represents a shake animation for an object.
 * @param {HTMLElement} object - The object to apply the shake animation to.
 */
function shakeAnimation(object){
    object.classList.add('shake')
    setTimeout(() => {
        object.classList.remove('shake');
    }, 1000);
}


export default setUpDragAndDrop

