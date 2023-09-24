import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  benefits: { type: String, required: true, trim: true },
  nutritional_facts: [
    {
      nutrient: { type: String, trim: true },
      quantity: { type: String, trim: true },
    },
  ],
  imageUrl: { type: String, required: true },
  imagePublicId: { type: String, required: true },
  date: { type: Date, default: new Date() },
});

// In nextjs we need to check if the model is pre-existing or create a new model
const ProductModel =
  mongoose.models.productschema ||
  mongoose.model("productschema", ProductSchema);

export default ProductModel;
