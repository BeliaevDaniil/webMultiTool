import Widget from "./Widget.js";

export class ClockWidget extends Widget {
    #months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    #days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    constructor() {
        super();
    }

    activate() {
        setInterval(this.#processTime.bind(this), 500);
    }

    #processTime() {
        const today = new Date();
        document.getElementById('date').innerHTML = (this.#days[today.getDay()] + " " +
            today.getDate() + " " + this.#months[today.getMonth()] + " " + today.getFullYear());

        let hours = today.getHours();
        let min = today.getMinutes();
        let sec = today.getSeconds();

        hours = hours < 10 ? '0' + hours : hours;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;

        document.getElementById('hours').innerHTML = hours;
        document.getElementById('min').innerHTML = min;
        document.getElementById('sec').innerHTML = sec;
    }
}