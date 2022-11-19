import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokensDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';

import { IUsersTokensRepository } from '../IUsersTokensRepository';

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  usersTokens: UserTokens[] = [];

  async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id, expires_date, refresh_token,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }
  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens | null> {
    return this.usersTokens.find(
      (userToken) => userToken.user_id === user_id && userToken.refresh_token === refresh_token,
    ) as UserTokens | null;
  }
  async deleteById(id: string): Promise<void> {
    const idx = this.usersTokens.findIndex((userToken) => userToken.id === id);
    if (idx >= 0) this.usersTokens.splice(idx, 1);
  }
  async findByRefreshToken(refresh_token: string): Promise<UserTokens | null> {
    return this.usersTokens.find(
      (userToken) => userToken.refresh_token === refresh_token,
    ) as UserTokens | null;
  }
}

export { UsersTokensRepositoryInMemory };
