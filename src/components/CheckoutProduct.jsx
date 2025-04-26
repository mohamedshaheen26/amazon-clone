import React from "react";
import "./CheckoutProduct.css";
import fullStarIcon from "../assets/icons/full-star.png";
import halfStarIcon from "../assets/icons/half-star.png";
import emptyStarIcon from "../assets/icons/empty-star.png";
import { useAuth } from "../context/GlobalState";

const CheckoutProduct = ({ product, hiddenButton }) => {
  const { dispatch } = useAuth();

  const removeFromCart = () => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: product.id,
    });
  };

  return (
    <div className='checkoutProduct'>
      <img
        className='checkoutProduct-image'
        src={product.image}
        alt={product.name}
      />
      <div className='checkoutProduct-info'>
        <p className='checkoutProduct-title'>{product.name}</p>
        <p className='checkoutProduct-price'>
          <small>$</small>
          <strong>{product.price}</strong>
        </p>
        <div className='checkoutProduct-rating'>
          {[...Array(5)].map((_, i) => (
            <p key={i}>
              <img
                src={
                  i < Math.floor(product.rating)
                    ? fullStarIcon
                    : i < product.rating
                    ? halfStarIcon
                    : emptyStarIcon
                }
                alt='star-icon'
              />
            </p>
          ))}
        </div>
        {!hiddenButton && (
          <button onClick={removeFromCart}>Remove from Cart</button>
        )}
      </div>
    </div>
  );
};

export default CheckoutProduct;
