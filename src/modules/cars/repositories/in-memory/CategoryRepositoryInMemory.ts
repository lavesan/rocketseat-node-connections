import { v4 as uuidV4 } from "uuid";

import { Category } from "../../infra/typeorm/entities/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoryRepository";

export class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: Category[] = [];

  findByName(name: string): Promise<Category> {
    const category = this.categories.find(
      (cat) => cat.name.toLowerCase() === name.toLowerCase()
    );
    return Promise.resolve(category);
  }

  list(): Promise<Category[]> {
    return Promise.resolve(this.categories);
  }

  create({ description, name }: ICreateCategoryDTO): Promise<void> {
    this.categories.push({
      id: uuidV4(),
      name,
      description,
      created_at: new Date(),
    });
    return Promise.resolve();
  }
}
