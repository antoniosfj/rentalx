import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import { IRentalsRepository } from '../IRentalsRepository';

class RentalsRepositoryInMemory implements IRentalsRepository {
  private rentals: Rental[] = [];

  async findOpenRentalByCarId(car_id: string): Promise<Rental | undefined | null> {
    return this.rentals.find((rental) => rental.car_id === car_id && !rental.end_date);
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental | undefined | null> {
    return this.rentals.find((rental) => rental.user_id === user_id && !rental.end_date);
  }
  async create({
    user_id, car_id, expected_return_date,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();
    const nowDate = new Date();

    Object.assign(rental, {
      user_id,
      car_id,
      expected_return_date,
      start_date: nowDate,
      created_at: nowDate,
      updated_at: nowDate,
    });

    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | null | undefined> {
    return this.rentals.find((rental) => rental.id === id);
  }
}

export { RentalsRepositoryInMemory };
