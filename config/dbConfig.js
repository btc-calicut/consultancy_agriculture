import mongoose from "mongoose";

export async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGOOSE_URL);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Mongoose successfully connected");
    });

    connection.on("error", (error) => {
      console.log("Connection unsuccessful" + error);

      // if we didn't exit, the server will start even if the mongodb connection fails
      process.exit();
    });
  } catch (error) {
    console.log("Failed to connect to mongoose" + error);

    process.exit();
  }
}
