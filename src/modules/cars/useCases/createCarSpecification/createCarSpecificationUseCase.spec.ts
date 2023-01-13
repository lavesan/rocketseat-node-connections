import "reflect-metadata";

import { AppError } from "@errors/AppError";
import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./createCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to the car", async () => {
    const car_id = "1234";
    const specifications_id = ["54321"];

    expect(async () => {
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Mock car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationRepositoryInMemory.create({
      name: "test",
      description: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});
