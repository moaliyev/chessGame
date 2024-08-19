import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI || "");
    console.log("Successfull");
  } catch (err) {
    console.log(err);
  }
};
