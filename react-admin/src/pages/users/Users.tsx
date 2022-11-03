import React from "react";
import Wrapper from "../../components/Wrapper";
import { useState, useEffect } from "react";
import axios from "axios";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import Paginator from "../../components/Paginator";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/users?page=${page}`);
      setUsers(data.users);
      setLastPage(data.meta.last_page);
    })();
  }, [page, lastPage]);

  const deleteUserHandler = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((u: User) => u.id !== id));
    }
  };

  return (
    <Wrapper>
      <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link
            to="/users/create"
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
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td>{user.email}</td>
                  <td>{user?.role?.name}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/users/${user.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deleteUserHandler(user.id)}
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
        <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
      </>
    </Wrapper>
  );
};

export default Users;
