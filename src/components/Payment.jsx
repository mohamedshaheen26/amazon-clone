import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { getCartTotal } from "../context/AppReducer";
import { CardElement } from "@stripe/react-stripe-js";

const Payment = () => {
  const { user, cart } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <div className='payment'>
      <div className='payment-container'>
        <h1>
          Checkout (<Link to='/checkout'>{cart?.length} Items</Link>)
        </h1>
        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Delivery Address</h3>
          </div>
          <div className='payment-address'>
            <p>{user?.email}</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Review items and delivery</h3>
          </div>
          <div className='payment-items'>
            {cart?.map((product) => (
              <CheckoutProduct key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className='payment-section'>
          <div className='payment-title'>
            <h3>Payment Method</h3>
          </div>
          <div className='payment-details'>
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className='payment-priceContainer'>
                <h3>
                  Order Total:{" "}
                  <strong>
                    <NumericFormat
                      value={getCartTotal(cart)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </strong>
                </h3>
                <button type='submit'>
                  <span>Buy Now</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
