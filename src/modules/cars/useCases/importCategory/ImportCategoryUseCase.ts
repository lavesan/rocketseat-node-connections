import fs from "fs";
import csvParse from "csv-parse";
import { CategoryRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}

class ImportCategoryUseCase {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // Creates a temporary file to read the data
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parseFile = csvParse.parse();

      stream.pipe(parseFile);

      parseFile
        .on("data", async (line) => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on("end", () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => reject(err));
    });
  }

  async execute(file: Express.Multer.File) {
    const categories = await this.loadCategories(file);

    categories.map(({ name, description }) => {
      const existCategory = this.categoryRepository.findByName(name);

      if (!existCategory) {
        this.categoryRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoryUseCase };
