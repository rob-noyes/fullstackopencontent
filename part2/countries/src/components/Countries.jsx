import { useEffect, useState } from "react"
import axios from 'axios'


const Countries = ({ countries, countryFilter }) => {

    const [selectedCountry, setSelectedCountry] = useState(null)
    const [weather, setWeather] = useState(null)
    const [weatherImg, setWeatherImg] = useState('')

    const showSelectedCountry = (country) => {
        setSelectedCountry(country)

        const api_key = import.meta.env.VITE_SOME_KEY
        const lat = country.latlng[0]
        const lon = country.latlng[1]
        const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`

        axios.get(url)
            .then(response => {
                setWeather(response.data)
                setWeatherImg(`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
            })
    }

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryFilter.toLowerCase()))

    useEffect(() => {
        if(filteredCountries.length === 1) {
            setSelectedCountry(filteredCountries[0])
        }
    }, [filteredCountries])

    if(selectedCountry) {
        return (
            <div key={selectedCountry.name.common}>
                {filteredCountries.length > 1 && (
                    <button onClick={() => setSelectedCountry(null)}>back</button>
                )}
                <h1>{selectedCountry.name.common}</h1>
                <p>capital {selectedCountry.capital}</p>
                <p>area {selectedCountry.area}</p>
                <strong>Languages</strong>
                <ul>
                    {Object.values(selectedCountry.languages).map((lang) => (
                    <li key={lang}>{lang}</li>
                    ))}
                </ul>
                <img src={selectedCountry.flags.png} alt={`Flag of ${selectedCountry.name.common}`} />
                {weather && (
                    <div className="weather">
                    <h1>Weather in {selectedCountry.capital[0]}</h1>
                    <p>temperature: {(weather.main.temp - 273.15).toFixed(2)} Celcius</p>
                    <img src={weatherImg} />
                    <p>Wind {weather.wind.speed.toFixed(2)} m/s</p>
                </div>
                )}
            </div>
        )
    }

    if(filteredCountries.length > 10) {
        return (
            <p>Too Many Countries</p>
        )
    }

    return (
        <ul>
            {filteredCountries.map((element) => (
                <li key={element.name.common}>
                    {element.name.common}
                    <button onClick={() => showSelectedCountry(element)}>show</button>
                </li>
            ))}
        </ul>
    )
}

export default Countries