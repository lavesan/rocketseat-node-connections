import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryUseCase {
  constructor(private readonly categoryRespository: ICategoryRepository) {
    this.categoryRespository = categoryRespository;
  }

  execute({ name, description }: IRequest) {
    const category = this.categoryRespository.findByName(name);

    if (category) throw new Error("Categoria já criada");
    //   return res.status(400).json({ error: "Categoria já criada" });

    this.categoryRespository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
