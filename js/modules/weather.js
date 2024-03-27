
function setUpWeather(){
    const apiKey = 'f251d856c58e6672d9a1f2502f32c0a3'
    const search_btn = document.querySelector('.search_btn')
    const image = document.querySelector('.weather_img');
    const temp = document.querySelector('.temp');
    const description = document.querySelector('.temp_description');

    search_btn.addEventListener('click', processWeatherSearch)

    function processWeatherSearch(){
        const city = document.querySelector('.weather_inp').value
        if (city === '') return

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') alert("ERROR 404: Not Found")

                const currWeather = json.weather[0]
                const currHours = new Date().getHours();

                const isDay = (currHours < 17)

                switch (currWeather.main) {
                    case 'Clear':
                        if (isDay) {
                            image.src = 'img/sun.png';
                        } else {
                            image.src = 'img/moon.png';
                        }
                        break;

                    case 'Rain':
                        if (isDay) {
                            image.src = 'img/rain.png';
                        } else {
                            image.src = 'img/moon_rain.png';
                        }
                        break;
                    case 'Snow':
                        if (isDay) {
                            image.src = 'img/snow.png';
                        } else {
                            image.src = 'img/moon_snow.png';
                        }
                        break;
                    case 'Clouds':
                        if (isDay) {
                            image.src = 'img/clouds.png';
                        } else {
                            image.src = 'img/moon_clouds.png';
                        }
                        break;
                    case 'Haze':
                        image.src = 'img/haze.png';
                        break;
                }

                temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                let lowerCaseDescription= `${currWeather.description}`;
                description.innerHTML = lowerCaseDescription.charAt(0).toUpperCase() + lowerCaseDescription.slice(1)

            })
    }
}



export default setUpWeather