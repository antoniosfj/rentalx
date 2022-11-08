import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';
import { CarImage } from '@modules/cars/infra/typeorm/entities/CarImage';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
// With the newer version you can't pass cli.migrationsDir so it needs to define the directory
// manually when runnnig migration:create. It seems that the newer versions of
// typeORM are very broken
// yarn typeorm migration:create src/shared/infra/typeorm/migrations/CreateCategories

export default (host = 'database'): DataSource => {
  const dataSource = new DataSource({
    type: 'postgres',
    host, // localhost when migratins and database when using on docker
    port: 5432,
    username: 'docker',
    password: 'ignite',
    database: 'rentalx',
    synchronize: false,
    logging: false,
    entities: [Category, Specification, User, Car, CarImage, Rental, UserTokens],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    subscribers: [],
  });

  return dataSource;
};
