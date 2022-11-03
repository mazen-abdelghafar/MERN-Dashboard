import React from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Role } from "../../models/role";

const Roles = () => {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/roles");
      setRoles(data);
    })();
  }, []);

  const deleteRoleHandler = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/roles/${id}`);
      setRoles(roles.filter((r: Role) => r.id !== id));
    }
  };

  return (
    <Wrapper>
      <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link
            to="/roles/create"
            className="btn btn-sm px-4 btn-outline-secondary"
          >
            Add
          </Link>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r: Role) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/roles/${r.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deleteRoleHandler(r.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    </Wrapper>
  );
};

export default Roles;
