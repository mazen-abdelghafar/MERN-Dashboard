import React from "react";
import Wrapper from "../../components/Wrapper";
import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import ImageUpload from "../../components/ImageUpload";

const ProductCreate = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitHandler = async (e: { preventDefault: any }) => {
    e.preventDefault();
    await axios.post("/products", {
      title,
      description,
      image,
      price,
    });
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/products" />;
  }

  return (
    <Wrapper>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <form onSubmit={submitHandler} className="mt-5">
            <div className="mb-3">
              <label>Title</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Image</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <ImageUpload uploaded={setImage} />
              </div>
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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

export default ProductCreate;
