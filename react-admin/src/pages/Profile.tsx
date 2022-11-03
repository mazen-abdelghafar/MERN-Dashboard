import React, { Dispatch } from "react";
import Wrapper from "../components/Wrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { User } from "../models/user";
import { setUser } from "../redux/actions/setUserAction";

const Profile = (props: { user: User; setUser: (user: User) => void }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { user, setUser } = props;
  useEffect(() => {
    setFirstName(user.first_name);
    setLastName(user.last_name);
    setEmail(user.email);
  }, [user]);

  const accountInfoSubmitHandler = async (e: { preventDefault: any }) => {
    e.preventDefault();
    const { data } = await axios.put("/user/info", {
      first_name: firstName,
      last_name: lastName,
      email,
    });
    setUser(
      new User(data.id, data.first_name, data.last_name, data.email, data.role)
    );
  };

  const passwordChangeSubmitHandler = async (e: { preventDefault: any }) => {
    e.preventDefault();
    await axios.put("/user/password", {
      password,
      password_confirm: passwordConfirm,
    });
  };

  return (
    <Wrapper>
      <>
        <div className="row d-flex justify-content-center">
          <div className="col-md-8">
            <h3 className="text-center mt-4">Account Information</h3>
            <form onSubmit={accountInfoSubmitHandler} className="mt-4">
              <div className="mb-3">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="d-grid">
                <button className="btn d-grid btn-outline-secondary">
                  Save
                </button>
              </div>
            </form>

            <hr />

            <h3 className="text-center mt-4">Change Password</h3>
            <form onSubmit={passwordChangeSubmitHandler} className="mt-4">
              <div className="mb-3">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label>Password Confirm</label>
                <input
                  type="password"
                  className="form-control"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>

              <div className="d-grid">
                <button className="btn d-grid btn-outline-secondary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </Wrapper>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    setUser: (user: User) => dispatch(setUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
