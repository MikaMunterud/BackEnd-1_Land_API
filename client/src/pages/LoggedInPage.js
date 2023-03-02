import { useState } from "react";

export default function LoggedInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [population, setPopulation] = useState("");
  const [capital, setCapital] = useState("");
  const [language, setLanguage] = useState("");
  const [messageLogin, setMessageLogin] = useState("");
  const [messageDelete, setMessageDelete] = useState("");
  const [messageAdd, setMessageAdd] = useState("");
  const [messageEdit, setMessageEdit] = useState("");
  const [countryEdit, setCountryEdit] = useState("");
  const [populationEdit, setPopulationEdit] = useState("");
  const [capitalEdit, setCapitalEdit] = useState("");
  const [languageEdit, setLanguageEdit] = useState("");
  const [countryDelete, setCountryDelete] = useState("");

  async function login(event) {
    event.preventDefault();
    let response = null;
    const user = {
      username: username,
      password: password,
    };

    try {
      response = await fetch("http://localhost:5050/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(user),
      });
    } catch (fetchError) {
      setMessageLogin("Could not make a fetch!");
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessageLogin(error);
        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessageLogin(error);
        return;
      }
      if (response.status === 200) {
        setMessageLogin("Successful login!");
      }
    } catch (Error) {
      setMessageLogin("Something went wrong!");
    }
  }

  async function deleteCountry(e) {
    e.preventDefault();
    let response = null;

    try {
      response = await fetch("http://localhost:5050/deleteCountry", {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ country: countryDelete }),
      });
    } catch (fetchError) {
      setMessageDelete("Could not make a fetch!");
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessageDelete(error);
        return;
      }
      if (response.status === 401) {
        const error = await response.text();
        setMessageDelete(error);
        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessageDelete(error);
        return;
      }
      if (response.status === 200) {
        return setMessageDelete("Successful delete!");
      }
    } catch (Error) {
      setMessageDelete("Something went wrong!");
    }
  }

  async function editCountry(e) {
    e.preventDefault();
    let response = null;

    const newCountry = {
      country: countryEdit,
      population: populationEdit,
      capital: capitalEdit,
      language: languageEdit,
    };

    try {
      response = await fetch("http://localhost:5050/editCountry", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCountry),
      });
    } catch (fetchError) {
      setMessageLogin("Could not make a fetch!");
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessageEdit(error);
        return;
      }
      if (response.status === 401) {
        const error = await response.text();
        setMessageEdit(error);
        return;
      }
      if (response.status === 404) {
        return setMessageEdit("Country not found!");
      }
      if (response.status === 200) {
        setMessageEdit("Successful edit!");
      }
    } catch (Error) {
      setMessageEdit("Something went wrong!");
    }
  }

  async function addCountry(e) {
    e.preventDefault();
    let response = null;

    const newCountry = {
      country: country,
      population: population,
      capital: capital,
      language: language,
    };

    try {
      response = await fetch("http://localhost:5050/addCountry", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newCountry),
      });
    } catch (fetchError) {
      setMessageAdd("Could not make a fetch!");
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessageAdd(error);
        return;
      }
      if (response.status === 401) {
        const error = await response.text();
        setMessageAdd(error);
        return;
      }
      if (response.status === 409) {
        const error = await response.text();
        setMessageAdd(error);
        return;
      }
      if (response.status === 201) {
        setMessageAdd("Successful add!");
      }
    } catch (Error) {
      setMessageAdd("Something went wrong!");
    }
  }

  return (
    <>
      <h2>Login Below:</h2>
      <form onSubmit={login}>
        <label>Username</label>
        <br></br>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <br></br>
        <label>Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br></br>
        <button>Login</button>
      </form>
      <br></br>
      {messageLogin.length > 0 && <p>{messageLogin}</p>}
      <h2>Add country Below:</h2>
      <form onSubmit={addCountry}>
        <label htmlFor="countryName">Country Name</label>
        <br></br>
        <input
          type="text"
          id="countryName"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="population">Population</label>
        <br></br>
        <input
          type="text"
          id="population"
          value={population}
          onChange={(e) => {
            setPopulation(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="capital">Capital</label>
        <br></br>
        <input
          type="text"
          id="capital"
          value={capital}
          onChange={(e) => {
            setCapital(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="language">Language</label>
        <br></br>
        <input
          type="text"
          id="language"
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
          }}
        />
        <br></br>
        <button>Add Country</button>
        <br></br>
      </form>

      <br></br>
      {messageAdd.length > 0 && <p>{messageAdd}</p>}

      <h2>Edit country Below:</h2>
      <br></br>
      <form onSubmit={editCountry}>
        <label htmlFor="countryNameEdit">Country Name</label>
        <br></br>
        <input
          type="text"
          id="countryNameEdit"
          value={countryEdit}
          onChange={(e) => {
            setCountryEdit(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="populationEdit">Population</label>
        <br></br>
        <input
          type="text"
          id="populationEdit"
          value={populationEdit}
          onChange={(e) => {
            setPopulationEdit(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="capitalEdit">Capital</label>
        <br></br>
        <input
          type="text"
          id="capitalEdit"
          value={capitalEdit}
          onChange={(e) => {
            setCapitalEdit(e.target.value);
          }}
        />
        <br></br>
        <label htmlFor="languageEdit">Language</label>
        <br></br>
        <input
          type="text"
          id="languageEdit"
          value={languageEdit}
          onChange={(e) => {
            setLanguageEdit(e.target.value);
          }}
        />
        <br></br>
        <button>Edit Country</button>
        <br></br>
      </form>
      <br></br>
      {messageEdit.length > 0 && <p>{messageEdit}</p>}
      <h2>Delete country Below:</h2>

      <form onSubmit={deleteCountry}>
        <label htmlFor="countryNameDelete">Country Name</label>
        <br></br>
        <input
          type="text"
          id="countryNameDelete"
          value={countryDelete}
          onChange={(e) => {
            setCountryDelete(e.target.value);
          }}
        />
        <br></br>
        <button>Delete Country</button>
      </form>
      {messageDelete.length > 0 && <p>{messageDelete}</p>}
    </>
  );
}
