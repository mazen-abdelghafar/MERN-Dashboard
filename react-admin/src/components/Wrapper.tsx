import axios from "axios";
import React, { Dispatch, useEffect } from "react";
import Menu from "./Menu";
import Nav from "./Nav";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../redux/actions/setUserAction";
import { User } from "../models/user";

const Wrapper = (props: any) => {
  const [redirect, setRedirect] = useState(false);

  const { setUser } = props;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("/user");
        setUser(
          new User(
            data.id,
            data.first_name,
            data.last_name,
            data.email,
            data.role
          )
        );
      } catch (error) {
        setRedirect(true);
      }
    })();
  }, [setUser]);

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Nav />

      <div className="container-fluid">
        <div className="row">
          <Menu />
          <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            {props.children}
          </main>
        </div>
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(Wrapper);
