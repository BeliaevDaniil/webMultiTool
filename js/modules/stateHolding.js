import {widgets} from "../main.js";
import {blobToArrayBuffer, arrayBufferToBlob, cleanDB} from "./utils.js";

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
    cleanDB("recordsDB")
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
function saveDictaphoneState() {
    const records = document.querySelectorAll('.record');
    const open = indexedDB.open("recordsDB");
    let db;

    if (records.length!==0) {
        open.onsuccess = async function(event) {
            db = event.target.result
            for (const record of records) {
                const audioBlob = await fetch(record.src).then(response => response.blob())
                const audioBuffer = await blobToArrayBuffer(audioBlob)
                const timestamp = new Date().getTime()

                const transaction = db.transaction(["recordStore"], "readwrite")
                const recordStore = transaction.objectStore("recordStore")
                const recordObj = {
                    audioBuffer: audioBuffer,
                    timestamp: timestamp
                }
                const addRequest = recordStore.add(recordObj)
                addRequest.onsuccess = ev => {
                    console.log("audio was saved")
                }
                addRequest.onerror = ev => {
                    console.error(`Audio was not saved: ${event.target.errorCode}`)
                }
            }
        }
        open.onerror = function(event) {
            console.error(`Database error: ${event.target.errorCode}`)
        }
    }
}

/**
 * Loads the state of the dictaphone.
 */
function loadDictaphoneState() {
    const openRequest = indexedDB.open("recordsDB")
    let db

    openRequest.onsuccess = function(event) {
        db = event.target.result
        const transaction = db.transaction(["recordStore"], "readonly")
        const objectStore = transaction.objectStore("recordStore")

        objectStore.openCursor().onsuccess = function(event) {
            const cursor = event.target.result
            if (cursor) {
                const blob = arrayBufferToBlob(cursor.value.audioBuffer)
                widgets[2].createRecordElement(blob)
                cursor.continue()
            } else {
                console.log("All blob objects retrieved")
            }
        }
    }

    openRequest.onerror = function(event) {
        console.error(`Database error: ${event.target.errorCode}`);
    };
}

export {activateStateHolding}
