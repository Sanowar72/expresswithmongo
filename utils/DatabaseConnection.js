import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const { MONGODB_USERNAME, MONGODB_PASSWORD, MONGODB_DATABASE } = process.env;

const myurl = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.vbuzcmm.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(myurl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
