import React from "react";
import { Carousel } from "antd";

const CardTransition = () => (
  <div>
    <Carousel dotPosition="bottom" autoplay>
      <div className="font-poppins bg-blue-100 h-40">CardTransition 1</div>
      <div className="font-poppins bg-blue-200 h-40">CardTransition 2</div>
      <div className="font-poppins bg-blue-300 h-40">CardTransition 3</div>
      <div className="font-poppins bg-blue-400 h-40">CardTransition 4</div>
    </Carousel>
  </div>
);

export default CardTransition;
