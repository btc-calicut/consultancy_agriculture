import { ArrowRightOutlined } from "@ant-design/icons";
import Image from "next/image";

const ProductCard = ({ product, openModal }) => {
  const truncatedDescription = product.description.substring(0, 100) + " . . .";
  return (
    <div className="shadow-xl border rounded-md max-w-sm bg-gray-900 hover:bg-gray-950 transition duration-300 hover:scale-[.97]">
      <div className="h-40 relative w-full">
        <Image
          className="object-cover rounded-t-md"
          src={product.imageUrl}
          alt={product.name}
          fill
          loading="lazy"
          sizes="100vw"
        />
      </div>

      <div className="p-4">
        <h5 className="text-xl mb-2 text-white">{product.name}</h5>
        <p className="text-sm mb-3 text-gray-400">{truncatedDescription}</p>
        <button
          onClick={() => openModal(product)}
          className="text-white font-medium rounded-lg text-xs px-3 py-2 gap-x-1 text-center inline-flex items-center bg-blue-600 hover:bg-blue-700"
        >
          Read more
          <ArrowRightOutlined />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
