import {ClockWidget} from "./modules/ClockWidget.js"
import {DictaphoneWidget} from "./modules/DictaphoneWidget.js"
import setUpDragAndDrop from "./modules/dragAndDrop.js"
import {WeatherWidget} from "./modules/WeatherWidget.js"
import {MapWidget} from "./modules/MapWidget.js";

//DRAG AND DROP
setUpDragAndDrop()
// WIDGETS
const widgets = [
    new ClockWidget(),
    new MapWidget(),
    new DictaphoneWidget(),
    new WeatherWidget()
]
widgets.forEach(widget => widget.activate())




































