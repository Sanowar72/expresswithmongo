import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "Please provide first name"],
    },
    last_name: {
      type: String,
      required: [true, "Please provide last name"],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: 6,
      //   select: false,
    },
    gender: {
      type: String,
      required: [true, "Please provide gender"],
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match user-entered password to hashed password in the database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("UserData", userSchema);
export default User;
