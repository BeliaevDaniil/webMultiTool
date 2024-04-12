import Widget from "./Widget.js";


/**
 * Widget for dictaphone functionality.
 * @extends Widget
 */
export class DictaphoneWidget extends Widget {
    /** @private */
    #mic = document.querySelector('.mic');
    /** @private */
    #isAbleToRecord = false;
    /** @private */
    #isRecording = false;
    /** @private */
    #recorder = null;

    constructor() {
        super();
    }

    /**
     * Activate the widget.
     */
    activate() {
        this.#mic.addEventListener('click', this.#switchMic.bind(this));
        if (navigator.mediaDevices) {
            navigator.mediaDevices
                .getUserMedia({
                    audio: true
                })
                .then(stream => this.#setUpStream(stream))
                .catch(err => console.error(err));
        }
    }

    /**
     * Set up the media stream.
     * @param {MediaStream} stream - The media stream to set up.
     * @private
     */
    #setUpStream(stream) {
        let chunks = []
        this.#recorder = new MediaRecorder(stream)
        this.#recorder.ondataavailable = ev => {
            chunks.push(ev.data)
        }
        this.#recorder.onstop = () => {
            const blop = new Blob(chunks, {type: "audio/ogg; codecs=opus"})
            chunks=[]
            if (document.querySelector('.dictaphone').childElementCount<4){
                this.createRecordElement(blop);
            } else alert("Too much records. Please delete some of them to add a new one")

        }
        this.#isAbleToRecord = true;
    }

    /**
     * Switch the microphone state (start/stop recording).
     * @private
     */
    #switchMic() {
        if (!this.#isAbleToRecord) return;
        this.#isRecording = !this.#isRecording;

        if (this.#isRecording){
            this.#recorder.start();
            this.#mic.classList.add('isRecording');
        } else {
            this.#recorder.stop();
            this.#mic.classList.remove('isRecording');
        }
    }

    /**
     * Delete a record element.
     * @private
     */
    #delRec() {
        document.getElementById('recordPlate').remove();
    }

    /**
     * Create a new record element.
     * @param {Blob} blop - The audio blob to create the record from.
     */
    createRecordElement(blop) {
        const newRecord = document.createElement('audio');
        newRecord.controls=true;
        newRecord.classList.add('record');
        newRecord.src = window.URL.createObjectURL(blop);

        const del_rec = document.createElement('button');
        del_rec.classList.add('deleteRecord');
        del_rec.addEventListener('click', this.#delRec);

        const recordPlate = document.createElement('div');
        recordPlate.classList.add('recordPlate');
        recordPlate.id = 'recordPlate';

        recordPlate.append(newRecord);
        recordPlate.append(del_rec);
        document.querySelector('.dictaphone').append(recordPlate);
    }
}
