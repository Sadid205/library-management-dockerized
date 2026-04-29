import dotenv from "dotenv";
import mongoose from "mongoose";
import app from ".";
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
async function main() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to mongodb using mongoose");
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
