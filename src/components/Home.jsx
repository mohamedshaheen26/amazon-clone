import React, { useEffect, useState } from "react";
import homeImg from "../assets/home.jpg";
import Product from "./Product";
import "./Home.css";

const Home = () => {
  const [product, setProduct] = useState();

  useEffect(() => {
    fetch("./data/products.json")
      .then((res) => res.json())
      .then((json) => setProduct(json));
  }, []);

  return (
    <div className='home'>
      <div className='home-container'>
        <img className='home-image' src={homeImg} alt='home-img' />
        <div className='home-row'>
          {product?.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
