import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoryRepository";

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase()
    );
    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }
}
