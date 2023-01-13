import "reflect-metadata";

import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { ListCarUseCase } from "./listCarUseCase";

let listCarsUseCase: ListCarUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsUseCase = new ListCarUseCase(carRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Mock car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const cars = await listCarsUseCase.execute();

    expect(cars).toEqual([car]);
    expect(cars.length).toBe(1);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Mock car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const car2 = await carRepositoryInMemory.create({
      name: "Mock car 2",
      description: "Description Car 2",
      daily_rate: 120,
      license_plate: "ABC-1238",
      fine_amount: 70,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const cars = await listCarsUseCase.execute({
      name: "Mock car",
    });

    expect(cars).toEqual([car]);
    expect(cars).not.toEqual([car2]);
    expect(cars.length).toBe(1);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Mock car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const car2 = await carRepositoryInMemory.create({
      name: "Mock car 2",
      description: "Description Car 2",
      daily_rate: 120,
      license_plate: "ABC-1238",
      fine_amount: 70,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category",
    });

    expect(cars).toEqual([car]);
    expect(cars).not.toEqual([car2]);
    expect(cars.length).toBe(1);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carRepositoryInMemory.create({
      name: "Mock car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const car2 = await carRepositoryInMemory.create({
      name: "Mock car 2",
      description: "Description Car 2",
      daily_rate: 120,
      license_plate: "ABC-1238",
      fine_amount: 70,
      brand: "Brand 2",
      category_id: "category 2",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Brand",
    });

    expect(cars).toEqual([car]);
    expect(cars).not.toEqual([car2]);
    expect(cars.length).toBe(1);
  });
});
