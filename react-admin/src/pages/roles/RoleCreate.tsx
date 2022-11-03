import React from "react";
import Wrapper from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { Permission } from "../../models/permission";

const RoleCreate = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/permissions");
      setPermissions(data);
    })();
  }, []);

  const checkBoxHandler = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const submitHandler = async (e: { preventDefault: any }) => {
    e.preventDefault();
    await axios.post("/roles", {
      name,
      permissions: selected,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/roles" />;
  }

  return (
    <Wrapper>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <form onSubmit={submitHandler} className="mt-5">
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3 row">
              <label className="col-sm-2 col-form-label">Permissions</label>
              <div className="col-sm-10">
                {permissions.map((p: Permission) => (
                  <div
                    key={p.id}
                    className="form-check form-check-inline col-3"
                  >
                    <input
                      value={p.id}
                      onChange={() => checkBoxHandler(p.id)}
                      type="checkbox"
                      className="form-check-input"
                    />
                    <label className="form-check-label">{p.name}</label>
                  </div>
                ))}
              </div>
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

export default RoleCreate;
