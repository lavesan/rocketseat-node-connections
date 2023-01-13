import { ICarsImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { Repository } from "typeorm";
import AppDataSource from "../../../../../../ormconfig";
import { CarImage } from "../entities/CarImage";

export class CarsImageRepository implements ICarsImageRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = AppDataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    });
    return this.repository.save(carImage);
  }
}
