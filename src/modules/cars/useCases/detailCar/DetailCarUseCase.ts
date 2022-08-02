import { inject, injectable } from 'tsyringe';

import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';

@injectable()
class DetailCarUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) { }
  async execute(car_id: string): Promise<Car | null | undefined> {
    const car = await this.carsRepository.findById(car_id);

    return car;
  }
}

export { DetailCarUseCase };
