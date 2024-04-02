import Widget from "./Widget.js";


export class DictaphoneWidget extends Widget{
    #mic = document.querySelector('.mic')
    #isAbleToRecord = false
    #isRecording = false
    #recorder = null;

    constructor() {
        super();
    }

    activate(){
        this.#mic.addEventListener('click', this.#switchMic.bind(this))
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: true
                })
                .then(stream => this.#setUpStream(stream))
                .catch(err => console.error(err))
        }
    }

    #setUpStream(stream){
        let chunks = []
        this.#recorder = new MediaRecorder(stream)
        this.#recorder.ondataavailable = ev => {
            chunks.push(ev.data)
        }

        this.#recorder.onstop = () => {
            const blop = new Blob(chunks, {type: "audio/ogg; codecs=opus"})
            chunks=[]
            if (document.querySelector('.dictaphone').childElementCount<4){
                this.#createRecordElement(blop)
            } else alert("Too much records. Please delete some of them to add a new one")

        }
        this.#isAbleToRecord = true
    }

    #switchMic(){
        if (!this.#isAbleToRecord) return
        this.#isRecording = !this.#isRecording

        if (this.#isRecording){
            this.#recorder.start()
            this.#mic.classList.add('isRecording')
        } else {
            this.#recorder.stop()
            this.#mic.classList.remove('isRecording')
        }
    }

    #delRec(){
        document.getElementById('recordPlate').remove()
    }

    #createRecordElement(blop){
        const newRecord = document.createElement('audio')
        newRecord.controls=true
        newRecord.classList.add('record')
        newRecord.src = window.URL.createObjectURL(blop)

        const del_rec = document.createElement('button')
        del_rec.classList.add('deleteRecord')
        del_rec.addEventListener('click', this.#delRec)

        const recordPlate = document.createElement('div')
        recordPlate.classList.add('recordPlate')
        recordPlate.id = 'recordPlate'

        recordPlate.append(newRecord)
        recordPlate.append(del_rec)
        document.querySelector('.dictaphone').append(recordPlate)
    }
}
