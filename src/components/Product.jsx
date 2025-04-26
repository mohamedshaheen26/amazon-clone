import React from "react";
import fullStarIcon from "../assets/icons/full-star.png";
import halfStarIcon from "../assets/icons/half-star.png";
import emptyStarIcon from "../assets/icons/empty-star.png";
import "./Product.css";
import { useAuth } from "../context/GlobalState";

const Product = ({ product }) => {
  const { dispatch } = useAuth();

  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        rating: product.rating,
      },
    });
  };

  return (
    <div className='product'>
      <div className='product-info'>
        <p>{product.name}</p>
        <p className='product-price'>
          <small>$</small>
          <strong>{product.price}</strong>
        </p>
      </div>
      <div className='product-rating'>
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
      <img src={product.image} alt={product.name} />
      <button onClick={addToCart}>Add to cart</button>
    </div>
  );
};

export default Product;
