import React from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";

const Order = ({ order }) => {
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.created).format("MMMM Do YYYY, h:mma")}</p>
      <p className='order-id'>
        <small>{order.id}</small>
      </p>
      {order.cart?.map((product) => (
        <CheckoutProduct
          key={product.id}
          product={product}
          hiddenButton={true}
        />
      ))}
      <h3 className='order-total'>
        Order Total:{" "}
        <NumericFormat
          value={order.amount * 100}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />
      </h3>
    </div>
  );
};

export default Order;
