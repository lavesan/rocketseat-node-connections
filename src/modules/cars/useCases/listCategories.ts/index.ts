import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoryRepository = CategoryRepository.getInstance();
const listCategoryUseCase = new ListCategoriesUseCase(categoryRepository);
const listCategoryController = new ListCategoriesController(
  listCategoryUseCase
);

export { listCategoryController };
