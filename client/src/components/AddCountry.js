import { useState } from "react";

export default function AddCountry({ setCountryMessage }) {
  const [country, setCountry] = useState("");
  const [flag, setFlag] = useState("");
  const [population, setPopulation] = useState("");
  const [capital, setCapital] = useState("");
  const [language, setLanguage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let response = null;

    const newCountry = {
      country,
      flag,
      population,
      capital,
      language,
    };

    try {
      response = await fetch("http://localhost:5050/countries", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCountry),
      });
    } catch (fetchError) {
      setCountryMessage("Could not make a fetch!");
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setCountryMessage(error);
        return;
      }
      if (response.status === 401) {
        const error = await response.text();
        setCountryMessage(error);
        return;
      }
      if (response.status === 409) {
        const error = await response.text();
        setCountryMessage(error);
        return;
      }
      if (response.status === 201) {
        setCountryMessage("Successful add!");
      }
    } catch (Error) {
      setCountryMessage("Something went wrong!");
    }
  }

  return (
    <div className="formSection">
      <h2>Add country Below:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="countryAdd">Country Name</label>
        <input
          type="text"
          id="countryAdd"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />

        <label htmlFor="flagAdd">Flag</label>
        <input
          type="text"
          id="flagAdd"
          value={flag}
          onChange={(e) => {
            setFlag(e.target.value);
          }}
        />

        <label htmlFor="populationAdd">Population</label>
        <input
          type="number"
          id="populationAdd"
          value={population}
          onChange={(e) => {
            setPopulation(e.target.value);
          }}
        />

        <label htmlFor="capitalAdd">Capital</label>

        <input
          type="text"
          id="capitalAdd"
          value={capital}
          onChange={(e) => {
            setCapital(e.target.value);
          }}
        />

        <label htmlFor="languageAdd">Language</label>

        <input
          type="text"
          id="languageAdd"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        />

        <button>Add Country</button>
      </form>
    </div>
  );
}
