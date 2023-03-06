import { useState } from "react";

export default function Login({ setMessage }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    let response = null;
    let postUrl = null;

    if (e.target.value === "login") {
      postUrl = "http://localhost:5050/authentication/login";
    } else {
      postUrl = "http://localhost:5050/authentication/register";
    }

    try {
      response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
    } catch (fetchError) {
      setMessage("Could not make a fetch!");
      return;
    }

    try {
      if (response.status === 400) {
        const error = await response.text();
        setMessage(error);
        return;
      }
      if (response.status === 404) {
        const error = await response.text();
        setMessage(error);
        return;
      }
      if (response.status === 200) {
        setMessage("Successful login!");
      }
    } catch (Error) {
      setMessage("Something went wrong!");
    }
  }

  return (
    <div className="formSection">
      <h2>Login or register Below:</h2>
      <form>
        <label htmlFor="username">Username</label>

        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div className="buttons">
          <button value={"login"} onClick={handleSubmit}>
            Login
          </button>
          <button value={"register"} onClick={handleSubmit}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
