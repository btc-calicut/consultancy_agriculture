import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  number: { type: String, trim: true },
  message: { type: String, required: true, trim: true },
  date: { type: Date, default: new Date() },
  responded: { type: Boolean, default: false },
});

// In nextjs we need to check if the model is pre-existing or create a new model
const EnquiryModel =
  mongoose.models.enquiryschema ||
  mongoose.model("enquiryschema", EnquirySchema);

export default EnquiryModel;
