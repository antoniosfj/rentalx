import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listAvailableCarsUsecase: ListAvailableCarsUseCase;

describe('List  Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUsecase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A2',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1213',
      fine_amount: 100,
      brand: 'Audi',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });
    const cars = await listAvailableCarsUsecase.execute({
      brand: 'Audi',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Audi A2',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1213',
      fine_amount: 100,
      brand: 'Audi',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    await carsRepositoryInMemory.create({
      name: 'Gol',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1214',
      fine_amount: 100,
      brand: 'Volkswagen',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    const cars = await listAvailableCarsUsecase.execute({
      name: 'Audi A2',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    await carsRepositoryInMemory.create({
      name: 'Audi A2',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1213',
      fine_amount: 100,
      brand: 'Audi',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Gol',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1214',
      fine_amount: 100,
      brand: 'Volkswagen',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    const cars = await listAvailableCarsUsecase.execute({
      brand: 'Volkswagen',
    });

    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    await carsRepositoryInMemory.create({
      name: 'Audi A2',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1213',
      fine_amount: 100,
      brand: 'Audi',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cc',
    });

    const car = await carsRepositoryInMemory.create({
      name: 'Gol',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1214',
      fine_amount: 100,
      brand: 'Volkswagen',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'Gol',
      description: 'Carrobao',
      daily_rate: 140,
      license_plate: 'DEF-1215',
      fine_amount: 100,
      brand: 'Volkswagen',
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    const cars = await listAvailableCarsUsecase.execute({
      category_id: '93381d76-aa69-4cfc-9ed5-471f174ea7cb',
    });

    expect(cars).toEqual([car, car2]);
  });
});
