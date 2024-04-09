import {widgets} from "../main.js";

/**
 * Object to hold the visibility state of widgets.
 * @type {Object}
 */
const widgetsVisibilityState = {}

/**
 * Object to hold the visibility state of icons.
 * @type {Object}
 */
const iconsVisibilityState = {}

/**
 * Activates the state holding mechanism.
 */
function activateStateHolding(){
    console.log("state holder was activated")
    window.addEventListener('beforeunload', saveAppState);
    window.addEventListener('load', loadAppState);
}

/**
 * Saves the application state.
 */
function saveAppState(){
    console.log("state was saved")
    saveWidgetsVisibility()
    saveDictaphoneState()
}

/**
 * Loads the application state.
 */
function loadAppState(){
    console.log("state was loaded")
    loadWidgetsVisibility()
    loadDictaphoneState()
}

/**
 * Saves the visibility state of widgets.
 */
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

/**
 * Loads the visibility state of widgets.
 */
function loadWidgetsVisibility(){
    const savedWidgetsVisibilityState = JSON.parse(localStorage.getItem('widgetsVisibilityState'))
    const savedIconsVisibilityState = JSON.parse(localStorage.getItem('iconsVisibilityState'))

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

/**
 * Saves the state of the dictaphone.
 */
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

/**
 * Loads the state of the dictaphone.
 */
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
