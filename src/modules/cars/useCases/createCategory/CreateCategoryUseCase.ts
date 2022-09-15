import { inject, injectable } from "tsyringe";

import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private readonly categoryRespository: ICategoryRepository
  ) {
    this.categoryRespository = categoryRespository;
  }

  async execute({ name, description }: IRequest): Promise<void> {
    const category = await this.categoryRespository.findByName(name);

    if (category) throw new Error("Categoria já criada");

    await this.categoryRespository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
