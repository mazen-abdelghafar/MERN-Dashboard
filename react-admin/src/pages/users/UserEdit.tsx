import React from "react";
import Wrapper from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Role } from "../../models/role";
import { Navigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [roleId, setRoleId] = useState("");
  const [roles, setRoles] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await axios.get("/roles");
      setRoles(response.data);

      const { data } = await axios.get(`/users/${id}`);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setRoleId(data.role.id);
    })();
  }, [id]);

  const submitHandler = async (e: { preventDefault: any }) => {
    e.preventDefault();
    await axios.put(`/users/${id}`, {
      first_name: firstName,
      last_name: lastName,
      email,
      role_id: roleId,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/users" />;
  }

  return (
    <Wrapper>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <form onSubmit={submitHandler} className="mt-5">
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
            <div className="mb-3">
              <label>Role</label>
              <select
                className="form-control"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                {roles.map((r: Role) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-grid">
              <button className="btn d-grid btn-outline-secondary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </Wrapper>
  );
};

export default UserEdit;
