import { Repository } from 'typeorm';

import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import dataSource from '@shared/infra/typeorm/index';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = dataSource.getRepository(Car);
  }

  async create({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }
  findByLicensePlate(license_plate: string): Promise<Car | undefined | null> {
    const car = this.repository.findOneBy({ license_plate });

    return car;
  }
}

export { CarsRepository };
