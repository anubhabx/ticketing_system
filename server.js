// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { connectDB } from "./database/connect.js";
import authRouter from "./routes/auth.route.js";
import ticketRouter from "./routes/ticket.route.js";
import adminRouter from "./routes/admin.route.js";

// const bodyParser = require("body-parser");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/auth", authRouter);
app.use("/api/tickets", ticketRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  connectDB(process.env.MONGODB_URI);
  console.log(`Server is running on http://localhost:${PORT}`);
});
