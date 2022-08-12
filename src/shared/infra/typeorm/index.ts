import 'reflect-metadata';
import DataSourceConnection from '@shared/infra/typeorm/data-source';

const dataSource = DataSourceConnection('database');

if (process.env.NODE_ENV === 'test') {
  dataSource.setOptions({ database: 'rentalx_test', host: 'localhost' });
}

if (process.argv.some((arg) => arg.includes('migration:'))) {
  dataSource.setOptions({ host: 'localhost' });
}

export default dataSource;
