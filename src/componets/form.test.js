import { render, screen, fireEvent } from "@testing-library/react";
import selectEvent from "react-select-event";
import userEvent from "@testing-library/user-event";
import Form from "./form";
// import API from "../api/API";

jest.mock("../api/API", () => {
  return {
    get: jest.fn().mockResolvedValue({
      data: {
        name: "Michael Scott",
        email: "michael.scott@dundermifflinpaper.biz",
        password: "heyimdatemikenicetomeetme",
        occupation: "Alexa Impersonator",
        state: "Pennsylvania",
      },
    }),
  };
});

test("fullname input should be rendered", () => {
  render(<Form />);
  const fullnameInputEl = screen.getByPlaceholderText(/Full Name/i);
  expect(fullnameInputEl).toBeInTheDocument();
});

test("email input should be rendered", () => {
  render(<Form />);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  expect(emailInputEl).toBeInTheDocument();
});

test("password input should be rendered", () => {
  render(<Form />);
  const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i);
  expect(passwordInputEl).toBeInTheDocument();
});

test("should show occupation options", () => {
  render(<Form />);
  const occupationElementStart = screen.getByTestId("occupations");
  expect(occupationElementStart).toHaveValue("");
});

test("should show state options", () => {
  render(<Form />);
  const stateElementStart = screen.getByTestId("states");
  expect(stateElementStart).toHaveValue("");
});

test("button input should be rendered", () => {
  render(<Form />);
  const fullnameInputEl = screen.getByRole("button");
  expect(fullnameInputEl).toBeInTheDocument();
});

test("fullname input should be change", () => {
  render(<Form />);
  const fullnameInputEl = screen.getByPlaceholderText(/Full Name/i);
  const testValue = "test";

  fireEvent.change(fullnameInputEl, { target: { value: testValue } });
  expect(fullnameInputEl.value).toBe(testValue);
});

test("email input should be change", () => {
  render(<Form />);
  const emailInputEl = screen.getByPlaceholderText(/Email/i);
  const testValue = "test";

  fireEvent.change(emailInputEl, { target: { value: testValue } });
  expect(emailInputEl.value).toBe(testValue);
});

test("password input should be change", () => {
  render(<Form />);
  const passwordInputEl = screen.getByPlaceholderText(/Enter Password/i);
  const testValue = "test";

  fireEvent.change(passwordInputEl, { target: { value: testValue } });
  expect(passwordInputEl.value).toBe(testValue);
});

test("occupation selection should be change", () => {
  render(<Form />);
  const occupationElement = screen.getByTestId("occupations", {
    occupations: ["Head of Shrubbery"],
  });

  fireEvent.change(occupationElement, {
    target: { value: "Head of Shrubber" },
  });

  expect(occupationElement).toBeInTheDocument();
});

test("select state options", async () => {
  render(<Form />);

  const stateElement = screen.getByTestId("states", {
    name: "Alabama",
  });

  fireEvent.change(stateElement, {
    target: { value: "Alabama" },
  });

  expect(stateElement).toBeInTheDocument();
});

test("button input should be changed", () => {
  render(<Form />);
  const fullnameInputEl = screen.getByRole("button");
  expect(fullnameInputEl).toBeInTheDocument();
});
