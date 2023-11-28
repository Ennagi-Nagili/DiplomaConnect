import "./Home.scss";
import FormInput, { FormInputProps } from "../../components/FormInput/FormInput";
import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Password from "antd/es/input/Password";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPaswords, setConfirmPassword] = useState("");

  const user: User = {
    firstName: firstName,
    lastName: lastName,
    fatherName: fatherName,
    phoneNumber: phoneNumber,
    email: email,
    password: password,
  }

  console.log("re-rencering");

  const navigate = useNavigate();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Clicking on a "Submit" button, prevent it from submitting a form
    navigate("/profile");
  };

  // Add: id, inputType, required ???
  const inputAttributes = [
    { label: "First Name", setValue: setFirstName,  },
    { label: "Last Name", setValue: setLastName, required: true },
    { label: "Father's Name", setValue: setFatherName, required: false },
    { label: "Phone Number", setValue: setPhoneNumber, required: false },
    { label: "Email", setValue: setEmail, required: true },
    { label: "Password", setValue: setPassword, required: true },
    { label: "Confirm Password", setValue: setConfirmPassword, required: true },
  ];

  return (
    <>
      <h1>Home Page</h1>

      <form onSubmit={handleOnSubmit}>
        <h2>Sign Up</h2>

        {inputAttributes.map((attributes) => (
          <FormInput {...attributes} />
        ))}

        <Link to="/login">Already have an account?</Link>

        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Home;
