"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import deleteProducts from "@utils/deleteProducts";
import { Modal, FloatButton, message, Drawer } from "antd";
import {
  CheckCircleOutlined,
  DownOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

export default function AdminProductPage({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [selectedProductList, setSelectedProductList] = useState([]);
  const [mobileView, setMobileView] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [overlay, setOverlay] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange); // This code sets up an event listener for the "resize" event on the window object when the component mounts (i.e., when we load admin page)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange); // This code removes the event listener when the component unmounts (i.e., when we exit the admin page)
    };
  }, []);

  const handleWindowSizeChange = () => {
    // this if condition determines whether it is mobile view
    if (window.innerWidth < 500) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  };

  const openModal = (product) => {
    if (!isSelected) {
      setSelectedProduct(product);
      if (mobileView) {
        setOverlay(true);
      } else {
        setIsModalOpen(true);
      }
    } else {
      const isProductInList = selectedProductList.some(
        (item) => item.name === product.name
      );
      if (isProductInList) {
        const newSelectedProductList = selectedProductList.filter(
          (item) => item.name !== product.name
        );
        setSelectedProductList(newSelectedProductList);
      } else {
        const newSelectedProductList = [...selectedProductList, product];
        setSelectedProductList(newSelectedProductList);
      }
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const confirmDelete = () => {
    if (selectedProductList.length !== 0) {
      Modal.confirm({
        title: `Are you sure, you want to delete this user?`,
        okText: "Yes",
        okType: "danger",
        onOk: () => {
          onDeleteClick();
        },
      });
    } else {
      message.warning("No products selected");
    }
  };

  const onDeleteClick = async () => {
    // delete request to api
    try {
      const accessToken = session.data?.user?.accessToken;
      const response = await deleteProducts(accessToken, selectedProductList);

      if (response.status === 200) {
        message.success("Product deleted");
        // to toggle the tick button
        onSelectClick();
        // to refresh the page
        router.refresh();
      } else if (response.status === 401) {
        message.error("Session expired. Please login again");
        // signout the user
        setTimeout(() => {
          signOut({ callbackUrl: "/auth/signin" });
        }, 3000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setSelectedProductList([]);
    }
  };

  // doubt
  const onSelectClick = () => {
    // this if statment is to reset the selectProduct array when we click the tick button again
    if (isSelected) {
      setSelectedProductList([]);
    }
    // this toggles the state os the tick button
    setIsSelected(!isSelected);
  };

  const isProductSelected = (prod) => {
    return selectedProductList.some(
      (item) => JSON.stringify(item) === JSON.stringify(prod)
    );
  };

  return (
    <>
      {!products ? (
        <div className="min-h-screen bg-zinc-100 font-semibold text-5xl text-gray-400 text-center flex items-center justify-center">
          <h1>No Products</h1>
        </div>
      ) : (
        <section className="min-h-screen bg-zinc-100">
          <div className="p-4 px-6 bg-white shadow">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              All products
            </h1>
          </div>

          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products &&
              products.map((prod) => (
                <div
                  key={prod.name}
                  onClick={() => openModal(prod)}
                  className={`${
                    isProductSelected(prod) ? "bg-blue-300" : "bg-white"
                  } shadow-lg p-0.5 rounded-lg overflow-hidden m-4 transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer`}
                >
                  <div className="h-40 relative w-full">
                    <Image
                      className="object-cover rounded-t-lg"
                      src={prod.imageUrl}
                      alt={prod.name}
                      fill
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL="data:image/webp;base64,UklGRpACAABXRUJQVlA4WAoAAAAgAAAAHAEAvAAASUNDUMgBAAAAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADZWUDggogAAANAOAJ0BKh0BvQA/cbjZZbSvLCcgKAKQLglpbuF2oAAWlsnIe+2TkPfgCAe+2TkPgP0u14uTkPfbJyHvtk5D32ych77ZOQ99snIe+2TkPfbJyHvtk5D32yciIHk5D32ych9C+l2vFych8B+l2vFych78AQD32ych77cy/T2ycKAA/uFO8+mfmtFtxm2ZdnDSYS00ZzyAgSvWI4AAXnJhAAAAAA=="
                      sizes="100vw"
                    />
                  </div>
                  <div className="p-2">
                    <h2 className="text-md">{prod.name}</h2>
                  </div>
                </div>
              ))}
          </div>

          {selectedProduct && mobileView && (
            <Drawer
              title={
                <h2 className="text-2xl font-semibold font-poppins">
                  {selectedProduct.name}
                </h2>
              }
              placement="bottom"
              closable={true}
              onClose={() => setOverlay(false)}
              open={overlay}
              closeIcon={<DownOutlined />}
              height="85vh"
              styles={{ header: { textAlign: "center" } }}
              className="rounded-3xl"
            >
              <div className="w-full flex flex-col space-y-2">
                <div className="text-gray-700 bg-gray-100 rounded-lg">
                  <div className="h-48 relative w-full mb-2">
                    <Image
                      className="object-cover rounded-lg"
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      fill
                      loading="lazy"
                      sizes="100vw"
                    />
                  </div>
                  <div className="p-4">{selectedProduct.description}</div>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg mb-4 font-semibold">
                    Nutritional Facts
                  </h3>
                  <ul className="list-disc list-inside my-2">
                    {selectedProduct.nutritional_facts &&
                      selectedProduct.nutritional_facts.map((key, index) => (
                        <li key={index} className="text-gray-700">
                          {key.nutrient}: {key.quantity}
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="bg-gray-100 p-4 rounded-md">
                  <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
                  <p className="text-gray-700 text-md">
                    {selectedProduct.benefits}
                  </p>
                </div>
              </div>
            </Drawer>
          )}

          {selectedProduct && !mobileView && (
            <Modal
              title={
                <h2 className="text-2xl font-semibold">
                  {selectedProduct.name}
                </h2>
              }
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              width="70vw"
            >
              <div className="grid grid-cols-2">
                <div className="p-4 space-y-4">
                  <div className="h-48 relative w-full">
                    <Image
                      className="object-cover rounded-lg"
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      fill
                      loading="lazy"
                      sizes="100vw"
                    />
                  </div>
                  <div className="text-gray-700 bg-gray-100 p-4 rounded-md">
                    {selectedProduct.description}
                  </div>
                </div>
                <div className="p-4">
                  <div className="mb-6 bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg mb-4 font-semibold">
                      Nutritional Facts
                    </h3>
                    <ul className="list-disc list-inside my-2">
                      {selectedProduct.nutritional_facts.map((key, index) => (
                        <li key={index} className="text-gray-600">
                          {key.nutrient}: {key.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h3 className="text-lg mb-4 font-semibold">Benefits</h3>
                    <div className="text-gray-700">
                      {selectedProduct.benefits}
                    </div>
                  </div>
                </div>
              </div>
            </Modal>
          )}

          <FloatButton
            icon={<CheckCircleOutlined />}
            type={isSelected ? "primary" : "default"}
            onClick={onSelectClick}
            style={{ right: 24, zIndex: 30 }}
          />
          <FloatButton
            icon={<DeleteOutlined style={{ color: "red" }} />}
            onClick={confirmDelete}
            style={{
              right: 94,
              visibility: isSelected ? "visible" : "hidden",
              zIndex: 30,
            }}
          />
        </section>
      )}
    </>
  );
}
