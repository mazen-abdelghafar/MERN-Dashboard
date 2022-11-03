import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "../models/user";
import { connect } from "react-redux";

const Nav = (props: { user: User }) => {
  const logoutHandler = async (e: { preventDefault: () => void }) => {
    await axios.post("/logout", {});
  };

  return (
    <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
      <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6" href="/">
        Company name
      </a>

      <ul className="nav ">
        <li className="nav-item">
          <Link className="nav-link text-white btn-link btn" to="/profile">
            {props.user.name}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link text-white btn-link btn"
            onClick={logoutHandler}
            to="/login"
          >
            Sign out
          </Link>
        </li>
      </ul>
    </header>
  );
};

const mapStateToProps = (state: { user: User }) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Nav);
