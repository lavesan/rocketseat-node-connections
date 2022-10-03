import { Category } from "../entities/Category";
import { Repository } from "typeorm";
import AppDataSource from "../../../../../../ormconfig";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      description,
    });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    return this.repository.find();
  }

  async findByName(name: string): Promise<Category> {
    return this.repository.findOne({ where: { name } });
  }
}

export { CategoryRepository };
