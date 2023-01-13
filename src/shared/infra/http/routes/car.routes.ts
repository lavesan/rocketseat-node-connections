import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listCar/listAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/uploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import uploadConfig from "@config/upload";

const carRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"));

carRoutes.post("/", createCarController.handle);
carRoutes.get("/available", listAvailableCarsController.handle);

carRoutes.use(ensureAuthenticated);
carRoutes.use(ensureAdmin);

carRoutes.post("/specifications/:id", createCarSpecificationController.handle);
carRoutes.post(
  "/images",
  upload.array("images"),
  uploadCarImagesController.handle
);

export { carRoutes };
