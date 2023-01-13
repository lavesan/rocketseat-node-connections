import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { Repository } from "typeorm";
import { Car } from "../entities/Car";
import AppDataSource from "../../../../../../ormconfig";
import { IListAvailableCarDTO } from "@modules/cars/dtos/IListAvailableCarDTO";

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  contructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create(data);
    return this.repository.save(car);
  }

  async findByLicensePlace(licensePlate: string): Promise<Car> {
    return this.repository.findOne({ where: { license_plate: licensePlate } });
  }

  async findAvailable({
    brand,
    category_id,
    name,
  }: IListAvailableCarDTO): Promise<Car[]> {
    const query = this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true });

    if (brand) query.andWhere("brand = :brand", { brand });
    if (category_id)
      query.andWhere("category_id = :category_id", { category_id });
    if (name) query.andWhere("name = :name", { name });

    return query.getMany();
  }

  async findById(id: string): Promise<Car> {
    return this.repository.findOne({ where: { id } });
  }
}

export { CarRepository };
