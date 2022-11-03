import React from "react";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import Paginator from "../../components/Paginator";
import { Order } from "../../models/order";
import { OrderItem } from "../../models/order-item";

const hide = {
  maxHeight: 0,
  transition: ".7s ease-in",
};

const show = {
  maxHeight: "150px",
  transition: ".7s ease-out",
};

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`/orders?page=${page}`);
      setOrders(data.data);
      setLastPage(data.meta.last_page);
    })();
  }, [page, lastPage]);

  const selectHandler = (id: number) => {
    setSelected(selected === id ? 0 : id);
  };

  const exportHandler = async () => {
    const { data } = await axios.post("/export", {}, { responseType: "blob" });
    const blob = new Blob([data], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  return (
    <Wrapper>
      <>
        <div className="pt-3 pb-2 mb-3 border-bottom">
          <button
            className="btn btn-sm px-4 btn-outline-secondary"
            onClick={exportHandler}
          >
            Export
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Total</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o: Order) => (
                <>
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.email}</td>
                    <td>{o.total}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-secondary"
                        onClick={() => selectHandler(o.id)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5}>
                      <div
                        className="overflow-hidden"
                        style={selected === o.id ? show : hide}
                      >
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Product Title</th>
                              <th>Quantity</th>
                              <th>Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {o.order_items.map((i: OrderItem) => (
                              <tr key={i.id}>
                                <td>{i.id}</td>
                                <td>{i.product_title}</td>
                                <td>{i.quantity}</td>
                                <td>{i.price}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <Paginator page={page} lastPage={lastPage} pageChanged={setPage} />
      </>
    </Wrapper>
  );
};

export default Orders;
