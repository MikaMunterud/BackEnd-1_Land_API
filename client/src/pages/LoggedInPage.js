import { useState } from "react";
import AddCountry from "../components/AddCountry";
import DeleteCountry from "../components/DeleteCountry";
import EditCountry from "../components/EditCountry";
import Login from "../components/Login";

export default function LoggedInPage() {
  const [message, setMessage] = useState("");
  const [countryMessage, setCountryMessage] = useState("");

  return (
    <section className="mainSection">
      <div className="loginSection">
        <Login setMessage={setMessage} />
      </div>
      {message.length > 0 && <p>{message}</p>}

      <div className="loginSection">
        <AddCountry setCountryMessage={setCountryMessage} />

        <EditCountry setCountryMessage={setCountryMessage} />

        <DeleteCountry setCountryMessage={setCountryMessage} />
      </div>
      {countryMessage.length > 0 && <p>{countryMessage}</p>}
    </section>
  );
}
