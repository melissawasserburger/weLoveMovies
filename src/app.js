if (process.env.USER) require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const reviewsRouter = require("./reviews/reviews.router");
const moviesRouter = require("./movies/movies.router");
const theatersRouter = require("./theaters/theaters.router");

app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

// Not Found Handler
app.use((req, res, next) => {
    next({ status: 404, message: `Path not found: ${req.originalUrl}.`});
});
// Error Handler
app.use((error, req, res, next) => {
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
