import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from "@modules/cars/repositories/ISpecificationRepository";
import { In, Repository } from "typeorm";
import AppDataSource from "../../../../../../ormconfig";
import { Specification } from "../entities/Specification";

class SpecificationRepository implements ISpecificationRepository {
  private readonly repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({ name, description });
    return this.repository.save(specification);
  }

  async findByName(name: string): Promise<Specification> {
    return this.repository.findOne({ where: { name } });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.find({ where: { id: In(ids) } });
  }
}

export { SpecificationRepository };
