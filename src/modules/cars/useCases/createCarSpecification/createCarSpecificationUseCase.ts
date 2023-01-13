import { AppError } from "@errors/AppError";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarRepository")
    private readonly carRepository: ICarRepository,
    @inject("SpecificationRepository")
    private readonly specificationRepository: ISpecificationRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carRepository.findById(car_id);

    if (!carExists) throw new AppError("Car doesn't exist!");

    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );

    carExists.specifications = specifications;

    return this.carRepository.create(carExists);
  }
}
