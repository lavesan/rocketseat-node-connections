import "reflect-metadata";

import { AppError } from "@errors/AppError";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";

let createCategory: CreateCategoryUseCase;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategory = new CreateCategoryUseCase(categoryRepositoryInMemory);
  });

  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description test",
    };

    await createCategory.execute(category);

    const createdCategory = await categoryRepositoryInMemory.findByName(
      category.name
    );

    expect(createdCategory).toHaveProperty("id");
  });

  it("should not be able to create a new category when name exists", async () => {
    expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description test",
      };

      const secondCategory = {
        name: category.name,
        description: "Category 2 description test",
      };

      await createCategory.execute(category);
      await createCategory.execute(secondCategory);
    }).rejects.toBeInstanceOf(AppError);
  });
});
