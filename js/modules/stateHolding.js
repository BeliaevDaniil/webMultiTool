import {widgets} from "../main.js";

const widgetsVisibilityState = {}
const iconsVisibilityState = {}

function activateStateHolding(){
    console.log("state holder was activated")
    window.addEventListener('beforeunload', saveAppState);
    window.addEventListener('load', loadAppState);
}

function saveAppState(){
    console.log("state was saved")
    saveWidgetsVisibility()
    saveDictaphoneState()
    saveMapState()
    saveWeatherState()
}

function loadAppState(){
    console.log("state was loaded")
    loadWidgetsVisibility()
    loadDictaphoneState()
    loadMapState()
    loadWeatherState()
}

function saveWidgetsVisibility(){
    document.querySelectorAll('.widget').forEach(widget => {
        widgetsVisibilityState[widget.id] = widget.hidden
    })
    document.querySelectorAll('.widgetIcon').forEach(icon =>{
        iconsVisibilityState[icon.id] = icon.hidden
    })
    localStorage.setItem('widgetsVisibilityState', JSON.stringify(widgetsVisibilityState))
    localStorage.setItem('iconsVisibilityState', JSON.stringify(iconsVisibilityState))
}

function loadWidgetsVisibility(){
    const savedWidgetsVisibilityState = JSON.parse(localStorage.getItem('widgetsVisibilityState'))
    const savedIconsVisibilityState = JSON.parse(localStorage.getItem('iconsVisibilityState'))
    console.log(savedWidgetsVisibilityState)
    console.log(savedIconsVisibilityState)

    if (savedWidgetsVisibilityState && savedIconsVisibilityState) {
        Object.keys(savedWidgetsVisibilityState).forEach(widgetId => {
            const widget = document.getElementById(widgetId);
            if (widget) {
                widget.hidden = savedWidgetsVisibilityState[widgetId]
            }
        })
        Object.keys(savedIconsVisibilityState).forEach(iconId => {
            const icon = document.getElementById(iconId);
            if (icon) {
                icon.hidden = savedIconsVisibilityState[iconId]
            }
        })
    }

}

function saveDictaphoneState(){
    const records = document.querySelectorAll('.record');
    if (records.length > 0) {
        const dictaphoneData = []
        records.forEach(record => {
            dictaphoneData.push(record.src);
        })
        localStorage.setItem('dictaphoneData', JSON.stringify(dictaphoneData))
    }
}

function loadDictaphoneState(){
    const savedData = JSON.parse(localStorage.getItem('dictaphoneData'))
    if (savedData) {
        savedData.map(recordSrc => {
            const blob = new Blob([recordSrc], { type: 'audio/ogg; codecs=opus' })
            widgets[2].createRecordElement(blob)
        })
    }
}

export {activateStateHolding}
