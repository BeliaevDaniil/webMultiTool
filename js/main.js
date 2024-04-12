import {ClockWidget} from "./modules/ClockWidget.js"
import {DictaphoneWidget} from "./modules/DictaphoneWidget.js"
import setUpDragAndDrop from "./modules/dragAndDrop.js"
import {WeatherWidget} from "./modules/WeatherWidget.js"
import {MapWidget} from "./modules/MapWidget.js";
import {activateStateHolding} from "./modules/stateHolding.js";
import {checkIfOffline} from "./modules/utils.js";

/**
 * Set up drag and drop functionality for widgets.
 */
setUpDragAndDrop()

/**
 * Array containing instances of different widgets.
 * @type {Array<Object>} Array of widget instances
 */
export const widgets = [
    /**
     * Clock widget instance.
     * @type {ClockWidget}
     */
    new ClockWidget(),
    /**
     * Map widget instance.
     * @type {MapWidget}
     */
    new MapWidget(),
    /**
     * Dictaphone widget instance.
     * @type {DictaphoneWidget}
     */
    new DictaphoneWidget(),
    /**
     * Weather widget instance.
     * @type {WeatherWidget}
     */
    new WeatherWidget()
];

/**
 * Activate each widget in the widgets array.
 */
widgets.forEach(widget => widget.activate())

/**
 * Activate state holding functionality.
 */
activateStateHolding()

/**
 * Check if the application is running in offline mode.
 */
checkIfOffline()
































