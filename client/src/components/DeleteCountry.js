import { useState } from "react";

export default function DeleteCountry({ setCountryMessage }) {
  const [country, setCountry] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    let response = null;

    try {
      response = await fetch("http://localhost:5050/countries", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ country }),
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
        const error = await response.text();
        setCountryMessage(error);
        return;
      }
      if (response.status === 200) {
        return setCountryMessage("Successful delete!");
      }
    } catch (Error) {
      setCountryMessage("Something went wrong!");
    }
  }

  return (
    <div className="formSection">
      <h2>Delete country Below:</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="countryNameDelete">Country Name</label>

        <input
          type="text"
          id="countryNameDelete"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />

        <button>Delete Country</button>
      </form>
    </div>
  );
}
