import Widget from "./Widget.js";


export class WeatherWidget extends Widget{
    #apiKey = 'f251d856c58e6672d9a1f2502f32c0a3'
    #search_btn = document.querySelector('.search_btn')
    #image = document.querySelector('.weather_img');
    #temp = document.querySelector('.temp');
    #description = document.querySelector('.temp_description');

    constructor() {
        super();
    }

    activate(){
        this.#search_btn.addEventListener('click', this.#setUp.bind(this))
    }

    #setUp(){
        const city = document.querySelector('.weather_inp').value
        if (city === '') return

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.#apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') alert("ERROR 404: Not Found")

                const currWeather = json.weather[0]
                const currHours = new Date().getHours();
                const isDay = (currHours < 17)

                switch (currWeather.main) {
                    case 'Clear':
                        if (isDay) {
                            this.#image.src = 'img/sun.png';
                        } else {
                            this.#image.src = 'img/moon.png';
                        }
                        break;
                    case 'Rain':
                        if (isDay) {
                            this.#image.src = 'img/rain.png';
                        } else {
                            this.#image.src = 'img/moon_rain.png';
                        }
                        break;
                    case 'Snow':
                        if (isDay) {
                            this.#image.src = 'img/snow.png';
                        } else {
                            this.#image.src = 'img/moon_snow.png';
                        }
                        break;
                    case 'Clouds':
                        if (isDay) {
                            this.#image.src = 'img/clouds.png';
                        } else {
                            this.#image.src = 'img/moon_clouds.png';
                        }
                        break;
                    case 'Haze':
                        this.#image.src = 'img/haze.png';
                        break;
                }
                this.#temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                let lowerCaseDescription= `${currWeather.description}`;
                this.#description.innerHTML = lowerCaseDescription.charAt(0).toUpperCase() + lowerCaseDescription.slice(1)

            })
    }
}

