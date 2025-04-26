import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import "./Payment.css";
import CheckoutProduct from "./CheckoutProduct";
import { NumericFormat } from "react-number-format";
import { getCartTotal } from "../context/AppReducer";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "./axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Payment = () => {
  const { user, cart, dispatch } = useAuth();

  const [clientSecret, setClientSecret] = useState();
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded, setSucceeded] = useState(false);
  const [processing, setProcessing] = useState("");

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post("/payments/create", {
          total: getCartTotal(cart) * 100,
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.error("Error creating payment intent:", error);
      }
    };

    if (cart?.length > 0) {
      getClientSecret();
    }
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
        setDoc(ref, {
          cart: cart,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
        setSucceeded(true);
        setError(null);
        setProcessing(false);
        dispatch({
          type: "EMPTY_BASKET",
        });
        navigate("/orders", { replace: true });
      });
  };

  const handleChange = (e) => {
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
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
                <button
                  type='submit'
                  disabled={disabled || processing || succeeded}
                >
                  <span>{processing ? "Processing" : "Buy Now"}</span>
                </button>
              </div>
              {error && (
                <div className='payment-error'>
                  <p>{error}</p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
