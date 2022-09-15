import { Repository } from "typeorm";
import AppDataSource from "../../../../../ormconfig";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User> {
    return this.repository.findOne({ where: { id } });
  }

  async update(user: User): Promise<void> {
    await this.repository.save(user);
  }

  async delete(id: string) {
    await this.repository.delete(id);
  }

  async findAll(): Promise<User[]> {
    console.log("veio aqui");
    return this.repository.find();
  }
}

export { UserRepository };
