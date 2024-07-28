import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/studentRoutes/StudentRoutes.js";
import userRouter from "./routes/userRoutes/UserRoutes.js";
import connectDB from "./utils/DatabaseConnection.js";
import insertDefaultUser from "./utils/insertDefaultUser.js";
import authenticate from "./utils/Authenticate.js";

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
  credentials: true, 
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use("/api/users", authenticate, router);
app.use("/api/auth", userRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

const startServer = async () => {
  try {
    await connectDB();
    await insertDefaultUser();

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
