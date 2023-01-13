import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { injectable, inject } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarRepository")
    private readonly carRepository: ICarRepository
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.carRepository.findByLicensePlace(
      license_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    return await this.carRepository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });
  }
}

export { CreateCarUseCase };
