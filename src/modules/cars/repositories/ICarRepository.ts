import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { IListAvailableCarDTO } from "../dtos/IListAvailableCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlace(licensePlate: string): Promise<Car>;
  findAvailable(data: IListAvailableCarDTO): Promise<Car[]>;
  findById(id: string): Promise<Car>;
}

export { ICarRepository };
