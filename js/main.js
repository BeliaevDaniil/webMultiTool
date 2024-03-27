import clock from "./modules/clock.js"
import initMap from "./modules/map.js"
import setUpDictaphone from "./modules/dictaphone.js"
import setUpDragAndDrop from "./modules/dragAndDrop.js"
import setUpWeather from "./modules/weather.js"

//DRAG AND DROP
setUpDragAndDrop()
//CLOCK
setInterval(clock, 500)
//GEO
initMap();
//DICTAPHONE
setUpDictaphone()
//WEATHER
setUpWeather()


































