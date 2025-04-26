import React from "react";
import "./Checkout.css";
import checkoutAd from "../assets/checkoutAd.jpg";
import { useAuth } from "../context/GlobalState";
import CheckoutProduct from "./CheckoutProduct";
import Subtotal from "./Subtotal";
import emptyCart from "../assets/emptyCart.svg";

const Checkout = () => {
  const { user, cart } = useAuth();

  return cart?.length > 0 ? (
    <div className='checkout'>
      <div className='checkout-left'>
        <img className='checkout-ad' src={checkoutAd} alt='checkout-ad' />
        <div>
          <h3>Hello, {user?.email || "Guest"}</h3>
          <h2>Your Shopping Cart</h2>

          {cart?.map((product) => (
            <CheckoutProduct key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div className='checkout-right'>
        <Subtotal />
      </div>
    </div>
  ) : (
    <div className='emptyCart'>
      <h2>Your Amazon cart is empty</h2>
      <img src={emptyCart} width={500} alt='empty-cart' />
    </div>
  );
};
export default Checkout;
