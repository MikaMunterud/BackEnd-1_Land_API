import { useState } from "react";

export default function EditCountry({ setCountryMessage }) {
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
        method: "PATCH",
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
      if (response.status === 404) {
        return setCountryMessage("Country not found!");
      }
      if (response.status === 200) {
        setCountryMessage("Successful edit!");
      }
    } catch (Error) {
      setCountryMessage("Something went wrong!");
    }
  }

  return (
    <div className="formSection">
      <h2>Edit country Below:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="countryEdit">Country Name</label>
        <input
          type="text"
          id="countryEdit"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />

        <label htmlFor="flagEdit">Flag</label>
        <input
          type="text"
          id="flagEdit"
          value={flag}
          onChange={(e) => {
            setFlag(e.target.value);
          }}
        />

        <label htmlFor="populationEdit">Population</label>
        <input
          type="number"
          id="populationEdit"
          value={population}
          onChange={(e) => {
            setPopulation(e.target.value);
          }}
        />

        <label htmlFor="capitalEdit">Capital</label>
        <input
          type="text"
          id="capitalEdit"
          value={capital}
          onChange={(e) => {
            setCapital(e.target.value);
          }}
        />

        <label htmlFor="languageEdit">Language</label>
        <input
          type="text"
          id="languageEdit"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        />

        <button>Edit Country</button>
      </form>
    </div>
  );
}
