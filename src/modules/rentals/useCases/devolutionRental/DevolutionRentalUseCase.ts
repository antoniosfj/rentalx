import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ id, user_id }: IRequest) {
    const minimun_daily = 1;
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new AppError('Rental does not exists!');
    }

    if (!(rental.user_id === user_id)) {
      throw new AppError('This rental doesnt belong to you!');
    }

    if (rental.end_date) {
      throw new AppError('Rental already devolved!');
    }

    const car = await this.carsRepository.findById(rental.car_id);

    if (!car) {
      throw new AppError('Error when trying to get rentals car!');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.dateDiff(
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = minimun_daily;
    }
    const delay = this.dateProvider.dateDiff(
      dateNow,
      rental.expected_return_date,
      'days',
    );

    let total = 0;

    if (dateNow > rental.expected_return_date && delay > 0) {
      const calculate_fine = delay * car.fine_amount;
      total = calculate_fine;
    }

    total += daily * car.daily_rate;
    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id as string, true);

    return rental;
  }
}

export { DevolutionRentalUseCase };
