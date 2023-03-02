import { useState } from "react";

export default function Homepage() {
  const [message, setMessage] = useState("");
  const [country, setCountry] = useState([]);
  const [countryName, setCountryName] = useState("");
  // const [renderMessage, setRenderMessage] = useState(false);

  async function getAllCountries() {
    let response = null;
    try {
      response = await fetch("http://localhost:5050/", {
        method: "GET",
      });
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      setCountry([]);
      return;
    }

    try {
      if (response.status === 406) {
        const error = await response.text();
        setMessage(error);
        setCountry([]);
      }

      if (response.status === 200) {
        const countries = await response.json();
        setCountry(countries);
        setMessage("");
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");
      setCountry([]);
    }
  }

  async function getCountry(event) {
    event.preventDefault();
    let response = null;

    const country = {
      country: countryName,
    };
    try {
      response = await fetch("http://localhost:5050/getCountry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(country),
      });
    } catch (FetchError) {
      setMessage("Could not make a fetch");
      return;
    }

    // const serverMessage = await response.text();

    // setCountry([]);

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
        const countryObj = await response.json();
        setCountry([countryObj]);
      }
    } catch (FetchError) {
      setMessage("Something went wrong!");

      setCountry([]);
    }
  }

  return (
    <>
      <button type="button" onClick={getAllCountries}>
        Get all countries
      </button>
      <br></br>

      <form onSubmit={getCountry}>
        <br></br>
        <label htmlFor="countryName">Country Name: </label>
        <br></br>
        <input
          type="text"
          id="countryName"
          value={countryName}
          onChange={(e) => {
            setCountryName(e.target.value);
          }}
        />
        <br></br>
        <button>Get country</button>
      </form>
      {message.length > 0 && <p>{message}</p>}
      {country.length > 0 && (
        <div>
          {country.map((item, i) => {
            return (
              <ul key={i}>
                <li>
                  <strong>Country: </strong> {item.country} {item.flag}
                </li>
                <li>
                  <strong>Population: </strong> {item.population}
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
