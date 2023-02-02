import mongoose from "mongoose";

const connectionDb = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
    }

    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    if (connection.readyState == 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectionDb;
