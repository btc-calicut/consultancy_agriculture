import mongoose from "mongoose";

const EnquirySchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true, trim: true },
  phonenumber: { type: String, required: true },
  responded: { type: Boolean, default: false },
  date: { type: Date, required: true },
});

// In nextjs we need to check if the model is pre-existing or create a new model
const EnquiryModel =
  mongoose.models.adminschema || mongoose.model("enquiryschema", EnquirySchema);

export default EnquiryModel;
