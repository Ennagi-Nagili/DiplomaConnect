import "./Home.scss";
import FormInput from "../../components/FormInput/FormInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Home = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPaswords, setConfirmPassword] = useState("");

  console.log("re-rencering");

  const navigate = useNavigate();

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Clicking on a "Submit" button, prevent it from submitting a form
    navigate("/profile");
  };

  return (
    <div>
      <h1>Home Page</h1>

      <form onSubmit={handleOnSubmit}>
        <h2>Sign Up</h2>

        <FormInput label={"Name"} setValue={setFirstName} />
        <FormInput label={"Surname"} setValue={setLastName} />
        <FormInput label={"Father Name"} setValue={setFatherName} />
        <FormInput label={"Phone Number"} setValue={setPhoneNumber} />
        <FormInput label={"Email"} setValue={setEmail} />
        <FormInput
          label={"Password"}
          inputType="password"
          setValue={setPassword}
        />
        <FormInput
          label={"Confirm Password"}
          inputType="password"
          setValue={setConfirmPassword}
        />

        <Link to="/login">Already have an account?</Link>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;
