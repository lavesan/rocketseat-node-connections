import { injectable, inject } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUserRepository } from "../../repositories/IUserRepository";

interface IRequest {
  user_id: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ user_id, avatarFile }: IRequest) {
    const user = await this.userRepository.findById(user_id);

    if (user.avatar) await deleteFile(`./tmp/avatar/${user.avatar}`);
    user.avatar = avatarFile;

    await this.userRepository.update(user);
  }
}

export { UpdateUserAvatarUseCase };
