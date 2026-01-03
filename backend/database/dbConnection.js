import mongoose from "mongoose";

export const dbConnection = () => {
  if (!process.env.MONGO_URI) {
    console.log("MONGO_URI is not defined in environment variables!");
    return;
  }
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "JobCloud",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
