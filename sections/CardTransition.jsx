import { Carousel } from "antd";

const CardTransition = () => (
  <div>
    <Carousel dots={false} dotPosition="top" autoplay>
      <div className="font-poppins bg-blue-100 h-40">Pict 1</div>
      <div className="font-poppins bg-blue-200 h-40">Pict 2</div>
      <div className="font-poppins bg-blue-300 h-40">Pict 3</div>
      <div className="font-poppins bg-blue-400 h-40">Pict 4</div>
    </Carousel>
  </div>
);

export default CardTransition;
