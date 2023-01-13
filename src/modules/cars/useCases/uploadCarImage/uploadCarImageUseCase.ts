import { ICarsImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarsImageRepository")
    private readonly carsImageRepository: ICarsImageRepository
  ) {}

  async execute({ car_id, images_name }: IRequest) {
    images_name.map(async (image) => {
      await this.carsImageRepository.create(car_id, image);
    });
  }
}
