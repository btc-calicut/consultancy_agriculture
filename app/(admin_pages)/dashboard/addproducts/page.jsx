"use client";

import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import { Button, message } from "antd";
import {
  LoadingOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const AddProductsPage = () => {
  const session = useSession();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    benefits: "",
    nutritional_facts: [],
    image: "",
  });

  const handleNutrientChange = (event, index) => {
    const updatedNutritionalFacts = [...formData.nutritional_facts];
    updatedNutritionalFacts[index].nutrient = event.target.value;
    setFormData({ ...formData, nutritional_facts: updatedNutritionalFacts });
  };

  const handleQuantityChange = (event, index) => {
    const updatedNutritionalFacts = [...formData.nutritional_facts];
    updatedNutritionalFacts[index].quantity = event.target.value;
    setFormData({ ...formData, nutritional_facts: updatedNutritionalFacts });
  };

  const handleAddNewNutrient = () => {
    const newRow = {
      nutrient: "",
      quantity: "",
    };
    const nutritional_facts = [...formData.nutritional_facts, newRow];
    setFormData({ ...formData, nutritional_facts });
  };

  const handleRemoveRow = (index) => {
    const updatedNutritionalFacts = [...formData.nutritional_facts];
    updatedNutritionalFacts.splice(index, 1);
    setFormData({ ...formData, nutritional_facts: updatedNutritionalFacts });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChangeImage = (event) => {
    event.preventDefault();
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.includes("image")) {
      message.error("Please upload an image file");
    }
    // 5MB in size
    if (file.size > 3 * 1024 * 1024) {
      message.error("Image size must be less than 3MB");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result;
      const resultAsString = result.toString();
      setFormData({
        ...formData,
        image: resultAsString,
      });
    };
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (!formData?.nutritional_facts[0]) {
      message.warning("Please add nutritional benefits");
      setLoading(false);
      return;
    }
    try {
      const response = await fetch(`/api/products`, {
        method: "POST",
        headers: {
          // Authorization: `Bearer ${session.data?.user?.accessToken}` // this doesnt work
          Authorization: session.data?.user?.accessToken,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status === 200) {
        message.success(data.message);
        setLoading(false);
        setFormData({
          name: "",
          description: "",
          benefits: "",
          nutritional_facts: [],
          image: "",
        });
        console.log(data.data);
      } else if (response.status === 401) {
        message.error("Session expired. Please login again");
        setTimeout(() => {
          signOut();
        }, 2000);
      } else if (response.status === 400) {
        message.error(data.message);
      } else if (response.status === 500) {
        message.error("Please try again");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-zinc-100">
      <div className="p-4 px-6 bg-white shadow">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Add products
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-start flex-col md:flex-row py-12 text-lg w-5/6 mx-auto"
      >
        <div className="relative flex items-center justify-start w-full min-h-[200px] md:min-h-[720px] md:mr-4">
          <label
            htmlFor="displayimage"
            className="flex justify-center items-center z-10 text-center absolute w-full h-full text-gray-400 border-2 border-gray-300 border-dashed rounded-lg"
          >
            {!formData.image && `Please upload a product image. Max size: 3Mb`}
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            required
            className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
            onChange={handleChangeImage}
          />
          {formData.image && (
            <Image
              src={formData?.image}
              className="object-contain z-20"
              alt="product_image"
              fill
            />
          )}
        </div>

        <div className="w-full h-full my-4 p-4 bg-white rounded-lg space-y-4">
          <div className="flex justify-start flex-col w-full gap-2">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-start flex-col w-full gap-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product description
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              type="text"
              name="description"
              id="description"
              rows="8"
              placeholder="Maximum 500 characters"
              style={{ resize: "none" }}
              maxLength="500"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="flex justify-start flex-col w-full gap-4">
            <label
              htmlFor="nutritional_benefits"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nutritional Benefits
            </label>
            <Button
              type="dashed"
              onClick={handleAddNewNutrient}
              block
              icon={<PlusOutlined />}
            >
              Add Nutritional benefit
            </Button>
            {formData.nutritional_facts.map((row, index) => (
              <div key={index} className="grid grid-cols-9 gap-2">
                <input
                  className="col-span-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
                  type="text"
                  value={row.nutrient}
                  onChange={(e) => handleNutrientChange(e, index)}
                  placeholder="Nutrient"
                  required
                />
                <input
                  className="col-span-4 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full h-10 p-2.5"
                  type="text"
                  value={row.quantity}
                  onChange={(e) => handleQuantityChange(e, index)}
                  placeholder="Quantity"
                  required
                />
                <div className="flex justify-center">
                  <MinusCircleOutlined onClick={() => handleRemoveRow(index)} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-start flex-col w-full gap-2">
            <label
              htmlFor="benefits"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Product Benefits
            </label>
            <textarea
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
              type="text"
              name="benefits"
              id="benefits"
              rows="8"
              placeholder="Maximum 500 characters"
              style={{ resize: "none" }}
              maxLength="500"
              required
              value={formData.benefits}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {loading ? (
              <LoadingOutlined
                style={{
                  fontSize: 24,
                }}
                spin
              />
            ) : (
              "Publish Product"
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddProductsPage;
