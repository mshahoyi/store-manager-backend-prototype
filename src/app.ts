import express from "express";
import storeRoute from "./routes/storeRoutes";
import globalErrorHandler from "./utils/globalErrorHandler";

const app = express();

// Middlewares
app.use(express.json());

// Routers
app.use(express.static("public"));
app.use("/api/v1/stores", storeRoute);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
