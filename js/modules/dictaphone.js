const mic = document.querySelector('.mic')
let isAbleToRecord = false
let isRecording = false
let recorder = null;

mic.addEventListener('click', switchMic)


function setUpAudio(){
    if (navigator.mediaDevices) {
        navigator.mediaDevices
            .getUserMedia({
                audio: true
            })
            .then(setUpStream)
            .catch(err => console.error(err))
    }
}
// setUpAudio()

function setUpStream(stream){
    let chunks = []
    recorder = new MediaRecorder(stream)
    recorder.ondataavailable = ev => {
        chunks.push(ev.data)
    }

    recorder.onstop = ev => {
        const blop = new Blob(chunks, {type: "audio/ogg; codecs=opus"})
        chunks=[]
        if (document.querySelector('.dictaphone').childElementCount<4){
            createRecordElement(blop)
        } else alert("Too much records. Please delete some of them to add a new one")

    }
    isAbleToRecord = true
}
function switchMic(){
    if (!isAbleToRecord) return
    isRecording = !isRecording

    if (isRecording){
        recorder.start()
        mic.classList.add('isRecording')
    } else {
        recorder.stop()
        mic.classList.remove('isRecording')
    }
}

function delRec(){
    document.getElementById('recordPlate').remove()
}

function createRecordElement(blop){
    const newRecord = document.createElement('audio')
    newRecord.controls=true
    newRecord.classList.add('record')
    newRecord.src = window.URL.createObjectURL(blop)

    const del_rec = document.createElement('button')
    del_rec.classList.add('deleteRecord')
    del_rec.addEventListener('click', delRec)

    const recordPlate = document.createElement('div')
    recordPlate.classList.add('recordPlate')
    recordPlate.id = 'recordPlate'

    recordPlate.append(newRecord)
    recordPlate.append(del_rec)
    document.querySelector('.dictaphone').append(recordPlate)
}

export default setUpAudio