import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <nav
      id="sidebarMenu"
      className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div className="position-sticky pt-3 sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink
              to={"/"}
              end
              className={(navData) =>
                navData.isActive ? "nav-link active" : "nav-link"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/users"}
              className={(navData) =>
                navData.isActive ? "nav-link active" : "nav-link"
              }
            >
              Users
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/roles"}
              className={(navData) =>
                navData.isActive ? "nav-link active" : "nav-link"
              }
            >
              Roles
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/products"}
              className={(navData) =>
                navData.isActive ? "nav-link active" : "nav-link"
              }
            >
              Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to={"/orders"}
              className={(navData) =>
                navData.isActive ? "nav-link active" : "nav-link"
              }
            >
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
