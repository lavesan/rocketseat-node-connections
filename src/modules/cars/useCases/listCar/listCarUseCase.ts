import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
export class ListCarUseCase {
  constructor(
    @inject("CarRepository")
    private readonly carRepository: ICarRepository
  ) {}

  async execute({ category_id, brand, name }: IRequest = {}): Promise<Car[]> {
    return this.carRepository.findAvailable({ category_id, brand, name });
  }
}
