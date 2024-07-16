import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import router from "./routes/studentRoutes/StudentRoutes.js";
import connectDB from "./utils/DatabaseConnection.js";
import insertDefaultUser from "./utils/insertDefaultUser.js";
import userRouter from "./routes/userRoutes/UserRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 4000;

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:3001",
  ],
  methods: "GET, POST, PUT, DELETE",
  optionsSuccessStatus: 200,
};

// app.use(cors(corsOptions));
// app.options("*", cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", router);
app.use("/api/auth", userRouter);
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const startServer = async () => {
  try {
    // Connect to the database
    await connectDB();

    // Insert default user if none exist
    await insertDefaultUser();

    // Start the server
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
