import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

dayjs.extend(utc);

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
    const minRentalHours = 24;
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCarId(car_id);

    if (carUnavailable) {
      throw new AppError('Car is unavailable!');
    }

    const userHasOpenRental = await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (userHasOpenRental) {
      throw new AppError('User has an open rental!');
    }
    const dateDiffInHours = this.dateProvider.dateDiff(
      this.dateProvider.dateNow(),
      expected_return_date,
    );

    if (dateDiffInHours < minRentalHours) {
      throw new AppError('Invalid return time!');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
