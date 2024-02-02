import "./loadEnv.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import moviesRouter from './routes/movies.js'
import userRouter from './routes/users.js'



const app = express();
const PORT = process.env.PORT || 4000;

// middlewares
app.use(cors()); // alows frontend to connect to backend
app.use(morgan("dev")); //logger - info about the request
app.use(express.json()); // for data in req.body
app.use(express.urlencoded({ extended: true })); // allow data in url string

// Routes
app.use("/api/movies", moviesRouter)
app.use("/api/users", userRouter)

app.get("/", (req, res) => {
  res.send("backend...");
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
