import axios from "axios";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import "../Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    await axios.post("/login", {
      email,
      password,
    });

    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="bg-wrapper text-center">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={submitHandler}>
          <h1 className="h3 mb-4 fw-normal">Please Singin</h1>

          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-100 mt-4 btn btn-lg btn-primary" type="submit">
            Submit
          </button>
        </form>
      </main>
    </div>
  );
};

export default Login;
