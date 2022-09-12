import express from "express";
import swaggerUI from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import { createConnection } from "../ormconfig";

const port = 3333;

const app = express();

createConnection();

app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.listen(port, () => console.log(`Server started on port ${port}`));
