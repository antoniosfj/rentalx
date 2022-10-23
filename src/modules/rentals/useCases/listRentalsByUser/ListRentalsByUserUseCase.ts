import { inject, injectable } from 'tsyringe';

import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute(user_id: string) {
    const users = await this.rentalsRepository.findByUserId(user_id);
    return users;
  }
}

export {
  ListRentalsByUserUseCase,
};
