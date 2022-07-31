import { Repository } from 'typeorm/repository/Repository';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';
import dataSource from '@shared/infra/typeorm';

import { CarImage } from '../entities/CarImage';

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = dataSource.getRepository(CarImage);
  }

  async create(car_id: string, image_name: string): Promise<CarImage> {
    const car = this.repository.create({
      car_id,
      image_name,
    });

    await this.repository.save(car);

    return car;
  }
}

export { CarsImagesRepository };
