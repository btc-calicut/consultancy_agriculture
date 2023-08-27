import React from "react";
import { Carousel } from "antd";

const CardTransition = () => (
  <div className="mx-10">
    <Carousel dotPosition="bottom" autoplay>
      <div className="bg-blue-100 h-40">CardTransition 1</div>
      <div className="bg-blue-200 h-40">CardTransition 2</div>
      <div className="bg-blue-300 h-40">CardTransition 3</div>
      <div className="bg-blue-400 h-40">CardTransition 4</div>
    </Carousel>
  </div>
);

export default CardTransition;
