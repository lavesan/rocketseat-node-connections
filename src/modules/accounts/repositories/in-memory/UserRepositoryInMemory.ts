import { v4 as uuiV4 } from "uuid";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../../dtos/IUpdateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../IUserRepository";

export class UserRepositoryInMemory implements IUserRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    this.users.push({
      id: uuiV4(),
      created_at: new Date(),
      ...data,
      avatar: "",
      isAdmin: false,
    });
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }

  async update(data: IUpdateUserDTO): Promise<void> {
    this.users = this.users.map((user) => {
      if (user.id === data.id)
        return {
          ...user,
          ...data,
        };
    });
  }
}
