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
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

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
    setFormErrors(handleErrorInput());
  };

  useEffect(() => {
    if (formErrors) {
      setSuccess();
    }
  }, [formErrors]);

  const handleErrorInput = () => {
    const regex = /^[^\s@+@[^s@\s@]+\.[^\s@]{2,}$/i;
    const errors = {};

    if (!name) {
      errors.name = "name is required!";
    }

    if (!email) {
      errors.email = "email is required!";
    } else if (!regex.test(email)) {
      errors.email = "This is not a valid email format";
    }

    if (!password) {
      errors.password = "password is required!";
    } else if (!regex.test(password.value < 4)) {
      errors.password = "Password must be more than 4 characters";
    }

    if (!occupation) {
      errors.occupation = "select occupation is required!";
    }

    if (!state) {
      errors.state = "select state is required!";
    }
    return errors;
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
              className="input"
              name="name"
              type="text"
              placeholder="Full Name"
              ref={inputRef}
              onChange={(e) => setName(e.target.value)}
            />
            <p className="form-error">{formErrors.name}</p>
            <label className="label">Email</label>
            <input
              className="input"
              name="email"
              type="text"
              placeholder="Email"
              ref={inputRef}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="form-error">{formErrors.email}</p>
            <label className="label">Password</label>
            <input
              className="input"
              name="password"
              type="password"
              placeholder="Enter Password"
              ref={inputRef}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="form-error">{formErrors.password}</p>
            <label className="label">Occupation</label>
            <select
              data-testid="occupation"
              name="occupation"
              className="selection"
              onChange={(e) => setSelectedOccupation(e.target.value)}
            >
              <option defaultValue=""></option>
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
            <p className="form-error">{formErrors.occupation}</p>

            <label className="label">State</label>
            <select
              className="selection"
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option defaultValue=""></option>
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
            <p className="form-error">{formErrors.state}</p>

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
