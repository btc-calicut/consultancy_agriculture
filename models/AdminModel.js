import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  role: {
    type: String,
    enum: ["admin"],
    default: "admin",
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
});

// In nextjs we need to check if the model is pre-existing or create a new model
const AdminModel =
  mongoose.models.adminschema || mongoose.model("adminschema", AdminSchema);

export default AdminModel;
