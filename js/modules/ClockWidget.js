import Widget from "./Widget.js";

/**
 * Represents a clock widget.
 * @extends Widget
 */
export class ClockWidget extends Widget {
    /**
     * Array containing names of months.
     * @type {string[]}
     * @private
     */
    #months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    /**
     * Array containing names of days.
     * @type {string[]}
     * @private
     */
    #days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    /**
     * Creates an instance of ClockWidget.
     */
    constructor() {
        super();
    }

    /**
     * Activates the clock widget by setting up interval for time update.
     */
    activate() {
        setInterval(this.#processTime.bind(this), 500);
    }

    /**
     * Updates the time and date displayed on the widget.
     * @private
     */
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