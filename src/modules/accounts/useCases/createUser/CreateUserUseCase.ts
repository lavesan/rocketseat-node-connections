import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ password, email, ...data }: ICreateUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);

    if (userAlreadyExists) throw new Error("User email already exists");

    const passwordHash = await hash(password, 8);

    this.userRepository.create({
      ...data,
      email,
      password: passwordHash,
    });
  }

  async update(data: any) {
    await this.userRepository.update(data);
  }
}

export { CreateUserUseCase };
