import React from "react";
import Wrapper from "../../components/Wrapper";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../../models/product";
import Paginator from "../../components/Paginator";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/products?page=${page}`);
      setProducts(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page, lastPage]);

  const deleteProductHandler = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await axios.delete(`/products/${id}`);
      setProducts(products.filter((p: Product) => p.id !== id));
    }
  };

  return (
    <Wrapper>
      <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <Link
            to="/products/create"
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
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p: Product) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>
                    <img src={p.image} alt={p.title} width="50" />
                  </td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                  <td>{p.price}</td>
                  <td>
                    <div className="btn-group mr-2">
                      <Link
                        to={`/products/${p.id}/edit`}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Edit
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => deleteProductHandler(p.id)}
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

export default Products;
