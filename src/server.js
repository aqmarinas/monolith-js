import express from "express";
import session from "express-session";
import connectFlash from "connect-flash";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import productRoutes from "./interfaces/http/routes/productRoutes.js";
import authRoutes from "./interfaces/http/routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const flash = connectFlash();

const port = process.env.APP_PORT || 3001;

app.set("views", path.join(__dirname, "interfaces/views/pages"));
app.set("view engine", "ejs");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash);
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.get("/", (req, res) => {
  res.send("Hello REDIKRU!");
});

app.use("/products", productRoutes);
app.use("/", authRoutes);

app.listen(port, () => {
  console.log(`CRUD app listening on port ${port}`);
});
