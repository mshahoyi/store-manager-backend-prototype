import express, { Request } from "express";
import storeRoute from "./routes/storeRoutes";
import globalErrorHandler from "./utils/globalErrorHandler";
import { paginationQueryMiddleware } from "./utils/paginationUtils";
import morgan from "morgan";
import categoryRoute from "./routes/categoryRoutes";
import productRoute from "./routes/productRoutes";

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "production" ? "tiny" : "dev"));
app.use(paginationQueryMiddleware);

// Routers
app.use(express.static("public"));
app.use("/api/v1/stores", storeRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);

// Global Error Handler
app.use(globalErrorHandler);

export default app;
