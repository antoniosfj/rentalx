import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { User } from '../modules/accounts/entities/User';
import { Category } from '../modules/cars/entities/Category';
import { Specification } from '../modules/cars/entities/Specification';
// With the newer version you can't pass cli.migrationsDir so it needs to define the directory
// manually when runnnig migration:create. It seems that the newer versions of
// typeORM are very broken
// yarn typeorm migration:create src/database/migrations/CreateCategories

const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', // localhost when migratins and database when using on docker
  port: 5432,
  username: 'docker',
  password: 'ignite',
  database: 'rentalx',
  synchronize: false,
  logging: false,
  entities: [Category, Specification, User],
  migrations: ['./src/database/migrations/*.ts'],
  subscribers: [],
});

dataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
});

export default dataSource;
