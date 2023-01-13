import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "../ICarRepository";
import { IListAvailableCarDTO } from "@modules/cars/dtos/IListAvailableCarDTO";

class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlace(licensePlate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === licensePlate);
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableCarDTO): Promise<Car[]> {
    return this.cars
      .filter((car) => car.available)
      .filter((car) => (name ? name === car.name : true))
      .filter((car) => (brand ? brand === car.brand : true))
      .filter((car) => (category_id ? category_id === car.category_id : true));
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarRepositoryInMemory };
