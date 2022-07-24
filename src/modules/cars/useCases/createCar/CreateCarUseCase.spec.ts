import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    await createCarUseCase.execute({
      name: 'Car name',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 100,
      brand: 'Brand',
      category_id: 'category',
    });
  });

  it('should not be able to create a new car with exists license plate', async () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car 1',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 100,
        brand: 'Brand',
        category_id: 'category',
      });

      await createCarUseCase.execute({
        name: 'Car 2',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 100,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
