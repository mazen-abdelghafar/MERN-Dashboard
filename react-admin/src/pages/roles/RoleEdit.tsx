import React from "react";
import Wrapper from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import { Permission } from "../../models/permission";

const RoleEdit = () => {
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState([]);
  const [selected, setSelected] = useState([] as number[]);
  const [redirect, setRedirect] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const response = await axios.get("/permissions");
      setPermissions(response.data);

      const { data } = await axios.get(`/roles/${id}`);
      setName(data.name);
      console.log();
      setSelected(data.permissions.map((p: Permission) => p.id));
    })();
  }, [id]);

  const checkBoxHandler = (id: number) => {
    if (selected.some((s) => s === id)) {
      setSelected(selected.filter((s) => s !== id));
      return;
    }

    setSelected([...selected, id]);
  };

  const submitHandler = async (e: { preventDefault: any }) => {
    e.preventDefault();
    await axios.put(`/roles/${id}`, {
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
                      checked={selected.some((s) => s === p.id)}
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

export default RoleEdit;
