import express, { Request } from "express";
import storeRoute from "./routes/storeRoutes";
import globalErrorHandler from "./utils/globalErrorHandler";
import { paginationQueryMiddleware } from "./utils/paginationUtils";

const app = express();

// Middlewares
app.use(express.json());
app.use(paginationQueryMiddleware);

// Routers
app.use(express.static("public"));
app.use("/api/v1/stores", storeRoute);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
