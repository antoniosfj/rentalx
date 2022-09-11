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
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.repository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car | undefined | null> {
    const car = await this.repository.findOneBy({ license_plate });

    return car;
  }

  async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
    const carsQuery = await this.repository.createQueryBuilder('c').where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('brand = :brand', { brand });
    }
    if (name) {
      carsQuery.andWhere('name = :name', { name });
    }
    if (category_id) {
      carsQuery.andWhere('category_id = :category_id', { category_id });
    }

    // carsQuery.leftJoinAndSelect('c.specifications', 'specification');
    // carsQuery.leftJoinAndSelect('c.images', 'ci');
    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car | null | undefined> {
    const car = await this.repository.findOne({
      relations: {
        images: true,
        specifications: true,
      },
      where: { id },
    });

    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update().set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}

export { CarsRepository };
