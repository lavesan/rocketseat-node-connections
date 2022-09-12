import { Router } from "express";
import multer from "multer";

import { createCategoryController } from "../modules/cars/useCases/createCategory";
import { importCategoryController } from "../modules/cars/useCases/importCategory";
import { listCategoryController } from "../modules/cars/useCases/listCategories.ts";

const categoriesRoutes = Router();

// save on temporary folder
const upload = multer({
  dest: "./tmp",
});

categoriesRoutes.post("/", createCategoryController.handle);
categoriesRoutes.get("/", listCategoryController.handle);
// Envio Multipart de file
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
