import React from "react";
import { NumericFormat } from "react-number-format";
import { useAuth } from "../context/GlobalState";
import { getCartTotal } from "../context/AppReducer";
import { useNavigate } from "react-router-dom";
import "./Subtotal.css";

const Subtotal = () => {
  const { cart } = useAuth();
  const navigate = useNavigate();

  return (
    <div className='subtotal'>
      <p>
        Subtotal {cart.length}:{" "}
        <strong>
          <NumericFormat
            value={getCartTotal(cart)}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"$"}
          />
        </strong>
      </p>
      <small className='subtotal__gift'>
        <input id='checkbox' type='checkbox' />
        <label htmlFor='checkbox'>This order contains a gift</label>
      </small>
      <button
        onClick={() => {
          navigate("/payment");
        }}
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Subtotal;
