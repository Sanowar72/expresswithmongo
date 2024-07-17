import User from "../models/UserModel.js";
import { hashPassword } from "../controller/UserController.js";

const insertDefaultUser = async () => {
  try {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      const { salt, hash } = hashPassword("password123");
      const defaultUser = new User({
        first_name: "Default",
        last_name: "User",
        email: "default@example.com",
        password: hash,
        salt: salt,
        gender: "Other",
        phone: "1234567890",
      });

      await defaultUser.save();
      console.log("Default user created");
    } else {
      console.log("Users already exist");
    }
  } catch (error) {
    console.error("Error inserting default user:", error);
  }
};

export default insertDefaultUser;
