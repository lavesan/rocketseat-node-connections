import { container } from "tsyringe";
import { UserRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import { CategoryRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { SpecificationRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { CarsImageRepository } from "@modules/cars/infra/typeorm/repositories/CarsImageRepository";
import { ICarsImageRepository } from "@modules/cars/repositories/ICarImageRepository";

// ICategoryRepository
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

// ISpecificationRepository
container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarsImageRepository>(
  "CarsImageRepository",
  CarsImageRepository
);
