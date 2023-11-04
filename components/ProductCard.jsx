import Image from "next/image";
import { ArrowRightOutlined } from "@ant-design/icons";

export default function ProductCard({ product, openModal }) {
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
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRpACAABXRUJQVlA4WAoAAAAgAAAAHAEAvAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggogAAANAOAJ0BKh0BvQA/cbjZZbSvLCcgKAKQLglpbuF2oAAWlsnIe+2TkPfgCAe+2TkPgP0u14uTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32yciIHk5D32ych9C+l2vFych8B+l2vFych78AQD32ych77cy/T2ycKAA/uFO8+mfmtFtxm2ZdnDSYS00ZzyAgSvWI4AAXnJhAAAAAA=="
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
}
