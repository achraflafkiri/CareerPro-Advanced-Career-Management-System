const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");

const authRouter = require("./routes/authRouter");
const companyRouter = require("./routes/companyRouter");
const profileRouter = require("./routes/profileRouter");
const globalRouter = require("./routes/globalRouter");
const taskRouter = require("./routes/taskRouter");

const handleErrors = require("./middlewares/handleErrors");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: "*",
  credentials: true
};
app.use(cors(corsOptions));

connectDB();

app.use("/api/v1/", globalRouter);

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/companies", companyRouter);
app.use("/api/v1/task", taskRouter);

app.use("/profile", express.static("uploads/"));

app.use(handleErrors);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}/`);
});
