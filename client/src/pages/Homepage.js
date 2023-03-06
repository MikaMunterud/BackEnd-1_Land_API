import { useState } from "react";

export default function Homepage() {
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState([]);
  const [countryName, setCountryName] = useState("");

  async function getAllCountries(event) {
    event.preventDefault();
    let response = null;

    let newCountryName = countryName;

    if (event.target.value === "allCountries") {
      newCountryName = "";
    }
    try {
      response = await fetch(
        `http://localhost:5050/countries/${newCountryName}`,
        {
          method: "GET",
        }
      );
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      setCountry([]);
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        setCountry([]);

        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        setCountry([]);
      }

      if (response.status === 200) {
        const countries = await response.json();
        if (countries.length > 1) {
          setCountry(countries);
        } else {
          setCountry([countries]);
        }
        setMessage("");
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
      setCountry([]);
    }
  }

  return (
    <>
      <h2>Check country</h2>
      <form onSubmit={getAllCountries}>
        <label htmlFor="countryName">Country Name: </label>
        <input
          type="text"
          id="countryName"
          value={countryName}
          onChange={(e) => {
            setCountryName(e.target.value);
          }}
        />
        <button>Get country</button>{" "}
        <button type="button" value="allCountries" onClick={getAllCountries}>
          Get all countries
        </button>
      </form>
      {message.length > 0 && <p>{message}</p>}
      {country.length > 0 && (
        <div>
          {country.map((item, i) => {
            const countryPopulation = item.population.toLocaleString();
            return (
              <ul key={i}>
                <li>
                  <strong>Country: </strong> {item.country} {item.flag}
                </li>
                <li>
                  <strong>Population: </strong> {countryPopulation}
                </li>
                <li>
                  <strong>Capital: </strong>
                  {item.capital}
                </li>
                <li>
                  <strong>Language: </strong>
                  {item.language}
                </li>
              </ul>
            );
          })}
        </div>
      )}
    </>
  );
}
