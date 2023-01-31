import { useState, useEffect, useRef } from "react";
import "./form.css";
import API from "../api/API";
const emailRegex = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;

function Form() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [occupation, setOccupation] = useState({});
  const [state, setState] = useState({});
  const inputRef = useRef();
  const [success, setSuccess] = useState(false);
  const [validEmail, setValidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [emailFocus, setEmailFocus] = useState(false);

  // Update the selected occupation or selected state
  const [selectedOccupation, setSelectedOccupation] = useState("");
  const [selectedState, setSelectedState] = useState("");

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
      if (!emailRegex.test(email)) {
        return errorMessage;
      }
      const response = await API.post("/form", newPost);
      setName(response.data);
      setEmail(response.data);
      setPassword(response.data);
      setOccupation(response.data);
      setState(response.data);
    } catch (error) {
      console.error(error);
    }
    setSuccess(true);
  };

  const emailInput = () => {
    const result = emailRegex.test(email);
    if (!result) {
      setErrorMessage("Invalid email characters");
    }
    return setValidEmail(result);
  };

  useEffect(() => {
    emailInput();
  });

  // const promise = async () => {
  //   try {
  //     return new Promise((resolve) => {
  //       API.get("/form").then((response) => {
  //         setOccupation([...response.data.occupations]);
  //         setState([...response.data.states]);
  //       });
  //       resolve(occupation, state);
  //     }).catch((err) => {
  //       console.log(err);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getOccupation = async () => {
    try {
      API.get("/form")
        .then((response) => {
          setOccupation([...response.data.occupations]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getState = async () => {
    try {
      API.get("/form")
        .then((response) => {
          setState([...response.data.states]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOccupation();
  }, []);

  useEffect(() => {
    getState();
  }, []);

  return (
    <>
      {success ? (
        <section className="success-container">
          <h1 className="success-title">Thank you for registering</h1>
        </section>
      ) : (
        <section className="section">
          <h1 className="signup-title">Sign Up</h1>
          <form className="form" onSubmit={handleSubmit}>
            <label className="label">Full Name</label>
            <input
              htmlFor="name"
              className="input"
              type="text"
              placeholder="Full Name"
              ref={inputRef}
              autoComplete="off"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <label className="label">Email</label>
            <p className="form-error"></p>
            <input
              htmlFor="email"
              className="input"
              name="email"
              type="text"
              placeholder="Email"
              ref={inputRef}
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />

            <p
              className={
                emailFocus && email && !validEmail ? "form-error" : "error-off"
              }
            >
              {errorMessage}
            </p>
            <label className="label">Password</label>
            <input
              htmlFor="password"
              className="input"
              name="password"
              type="password"
              placeholder="Enter Password"
              ref={inputRef}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="form-error"></p>
            <label htmlFor="occupations" className="label">
              Occupation
            </label>
            <select
              data-testid="occupations"
              name="occupation"
              className="selection"
              required
              value={selectedOccupation}
              onChange={(e) => setSelectedOccupation(e.target.value)}
            >
              <option value=""></option>
              {Array.isArray(occupation) &&
                occupation.map((occupations) => {
                  return (
                    <option
                      data-testid="occupations"
                      key={occupations}
                      value={occupations}
                    >
                      {occupations}
                    </option>
                  );
                })}
            </select>
            <p className="form-error"></p>
            <label htmlFor="states" className="label">
              State
            </label>
            <select
              data-testid="states"
              name="state"
              className="selection"
              required
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value=""></option>
              {Array.isArray(state) &&
                state.map((states) => {
                  return (
                    <option key={states.abbreviation} value={states.name}>
                      {states.name}
                    </option>
                  );
                })}
            </select>
            <p className="form-error"></p>

            <button className="submit-button" type="submit">
              Sign up
            </button>
          </form>
        </section>
      )}
    </>
  );
}

export default Form;
