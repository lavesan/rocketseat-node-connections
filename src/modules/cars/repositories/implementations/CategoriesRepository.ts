import { Category } from "../../model/Category";
import { ICreateCategoryDTO } from "../ICategoryRepository";

class CategoryRepository {
  private categories: Category[];

  private static INSTANCE: CategoryRepository;

  constructor() {
    this.categories = [];
  }

  public static getInstance(): CategoryRepository {
    if (!this.INSTANCE) {
      this.INSTANCE = new CategoryRepository();
    }
    return this.INSTANCE;
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    });

    this.categories.push(category);
  }

  list(): Category[] {
    return this.categories;
  }

  findByName(name: string): Category {
    return this.categories.find((category) => category.name === name);
  }
}

export { CategoryRepository };
