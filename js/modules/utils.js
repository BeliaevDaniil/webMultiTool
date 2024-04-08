function getNodeById(nodes, id) {
    for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === id) {
            return nodes[i];
        }
    }
    return null;
}

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


function hasSpecialChars(text) {
    const specialChars = ['&', '<', '>', '"', '\''];

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (specialChars.includes(char)) return true;
    }
    return false
}

export {getNodeById, validateInput}