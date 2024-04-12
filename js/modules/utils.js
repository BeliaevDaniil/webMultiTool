/**
 * Returns a node from an array of nodes by its identifier.
 * @param {Array<Object>} nodes - Array of node objects.
 * @param {string} id - Identifier of the node to be found.
 * @returns {Object|null} - The found node or null if the node is not found.
 */
function getNodeById(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            return nodes[i];
        }
    }
    return null;
}

/**
 * Validates the input text according to specified criteria.
 * @param {string} text - Input text to be validated.
 * @returns {boolean} - Returns true if the input text passes validation, otherwise false.
 */
function validateInput(text){
    if (text.length < 3){
        alert("Input is too short")
        return false
    }
    if (text.length > 20) {
        alert("Input is too long")
        return false
    }
    if (hasSpecialChars(text)){
        alert("Input can contain only letters")
        return false
    }
    return true
}

/**
 * Checks for the presence of special characters in the text.
 * @param {string} text - Text to be checked.
 * @returns {boolean} - Returns true if the text contains special characters, otherwise false.
 */
function hasSpecialChars(text) {
    const specialChars = ['&', '<', '>', '"', '\''];

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (specialChars.includes(char)) return true;
    }
    return false
}

/**
 * Checks if the browser is in offline mode and displays a corresponding message.
 */
function checkIfOffline(){
    window.addEventListener('offline', function(event) {
        alert('Web paged was switched to offline mode. "Map" and "Weather" widgets will not be available or their functionality will be limited');
    })
}

/**
 * Converts a Blob to an ArrayBuffer asynchronously.
 * @param {Blob} blob - The Blob object to convert.
 * @returns {Promise<ArrayBuffer>} A Promise that resolves with the ArrayBuffer.
 */
function blobToArrayBuffer(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.addEventListener('loadend', (e) => {
            resolve(reader.result);
        });
        reader.addEventListener('error', reject);
        reader.readAsArrayBuffer(blob);
    });
}

/**
 * Converts an ArrayBuffer to a Blob.
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert.
 * @param {string} type - The MIME type of the Blob to create.
 * @returns {Blob} The converted Blob object.
 */
function arrayBufferToBlob(buffer, type) {
    return new Blob([buffer], {type: type});
}

/**
 * Deletes all elements in DB
 * @param dbName
 */
function cleanDB(dbName){
    const request = indexedDB.open(dbName);

    request.onsuccess = function(event) {
        const db = event.target.result;

        const transaction = db.transaction(['recordStore'], 'readwrite');
        const objectStore = transaction.objectStore('recordStore');
        objectStore.openCursor().onsuccess = function(event) {
            const cursor = event.target.result;
            if (cursor) {
                cursor.delete();
                cursor.continue();
            }
        }
    }
}


export {getNodeById, validateInput, checkIfOffline, blobToArrayBuffer, arrayBufferToBlob, cleanDB}