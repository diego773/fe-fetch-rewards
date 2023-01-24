import { useState, useEffect, useRef } from "react";
import "./form.css";
import API from "../api/API";

function Form() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [occupation, setOccupation] = useState({});
  const [state, setState] = useState({});
  const inputRef = useRef();

  // Update the selected occupation or selected state
  const [selectedOccupation, setSelectedOccupation] = useState();
  const [selectedState, setSelectedState] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      name,
      email,
      password,
      occupation: selectedOccupation,
      state: selectedState,
    };

    try {
      const response = await API.post("/form", newPost);

      setName(response.data);
      setEmail(response.data);
      setPassword(response.data);
      setOccupation(response.data);
      setState(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    API.get("/form")
      .then((response) => {
        setOccupation([...response.data.occupations]);
        setState([...response.data.states]);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <section className="section">
      Sign Up
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">Full Name</label>
        <input
          className="input"
          type="text"
          placeholder="Full Name"
          ref={inputRef}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label className="label">Email</label>
        <input
          className="input"
          type="text"
          placeholder="Email"
          ref={inputRef}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter Password"
          ref={inputRef}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label className="label">Occupation</label>
        <select
          data-testid="occupation"
          name="occupation"
          className="selection"
          onChange={(e) => setSelectedOccupation(e.target.value)}
        >
          {Array.isArray(occupation)
            ? occupation.map((occupations) => {
                return (
                  <option key={occupations} value={occupations}>
                    {occupations}
                  </option>
                );
              })
            : null}
        </select>

        <label className="label">State</label>
        <select
          className="selection"
          defaultValue="default-value"
          onChange={(e) => setSelectedState(e.target.value)}
        >
          {Array.isArray(state)
            ? state.map((states) => {
                return (
                  <option key={states.abbreviation} value={states.name}>
                    {states.name}
                  </option>
                );
              })
            : null}
        </select>

        <button className="submit-button" type="submit">
          Sign up
        </button>
      </form>
    </section>
  );
}

export default Form;
