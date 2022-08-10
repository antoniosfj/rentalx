import { Repository } from 'typeorm';

import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import dataSource from '@shared/infra/typeorm/index';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = dataSource.getRepository(Rental);
  }

  findOpenRentalByCarId(car_id: string): Promise<Rental | null | undefined> {
    return this.repository.findOneBy({ car_id });
  }
  findOpenRentalByUserId(user_id: string): Promise<Rental | null | undefined> {
    return this.repository.findOneBy({ user_id });
  }
  async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    await this.repository.save(rental);

    return rental;
  }
}

export { RentalsRepository };
