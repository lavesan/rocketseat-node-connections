import { Category } from "../../model/Category";
import { ICategoryRepository } from "../ICategoryRepository";

class PostgresCategoryRepository implements ICategoryRepository {
  findByName(name: string): Category {
    console.log("name: ", name);
    return null;
  }

  list(): Category[] {
    return null;
  }

  create({ name, description }: { name: string; description: string }): void {}
}

export { PostgresCategoryRepository };
