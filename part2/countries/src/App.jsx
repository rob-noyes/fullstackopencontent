import { useEffect, useState } from "react"
import axios from 'axios'
import Countries from "./components/Countries"

function App() {
  const [countryFilter, setCurrentCountry] = useState('')
  const [countries, setCountries] = useState([])

  const handleCountryChange = (event) => {
    setCurrentCountry(event.target.value)
  }

  useEffect(() => {
    const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <div>
        find countries <input onChange={handleCountryChange} value={countryFilter} ></input>
      </div>
     <Countries countries={countries} countryFilter={countryFilter} />
    </div>
  )
}

export default App
