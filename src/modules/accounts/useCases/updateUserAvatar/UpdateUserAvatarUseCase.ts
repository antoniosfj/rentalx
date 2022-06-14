import { inject, injectable } from 'tsyringe';

import { deleteFile } from '../../../../utils/file';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  avatar_file: string|null|undefined;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id) as User;

    if (user.avatar) {
      await deleteFile(`./temp/avatar/${user.avatar}`);
    }
    // if (!user) {
    //   throw new AppError('User does not exists.', 404);
    // }
    user.avatar = avatar_file as string;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
