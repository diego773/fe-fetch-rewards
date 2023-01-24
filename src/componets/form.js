import { useState, useEffect } from "react";

function Form() {
  return (
    <section className="section">
      Sign Up
      <form className="form">
        <label className="label">Full Name</label>
        <input className="input" type="text" placeholder="Full Name" required />
        <label className="label">Email</label>
        <input className="input" type="text" placeholder="Email" required />
        <label className="label">Password</label>
        <input
          className="input"
          type="password"
          placeholder="Enter Password"
          required
        />
        <label className="label">Occupation</label>
        <select
          data-testid="occupation"
          name="occupation"
          className="selection"
        ></select>
        <label className="label">State</label>
        <select className="selection" defaultValue="default-value"></select>
        <button className="submit-button" type="submit">
          Sign up
        </button>
      </form>
    </section>
  );
}

export default Form;
