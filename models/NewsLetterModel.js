import mongoose from "mongoose";

const NewsLetterSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true },
  date: { type: Date, default: new Date() },
});

// In nextjs we need to check if the model is pre-existing or create a new model
const NewsLetterModel =
  mongoose.models.newsletterschema ||
  mongoose.model("newsletterschema", NewsLetterSchema);

export default NewsLetterModel;
