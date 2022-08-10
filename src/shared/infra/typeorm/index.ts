import 'reflect-metadata';
import DataSourceConnection from '@shared/infra/typeorm/data-source';

const dataSource = DataSourceConnection();

if (process.env.NODE_ENV === 'test') {
  dataSource.setOptions({ database: 'rentalx_test', host: 'localhost' });
}

if (process.argv.some((arg) => arg.includes('migration:'))) {
  dataSource.setOptions({ host: 'localhost' });
} else {
  dataSource.initialize().then(() => {
    console.log('Data Source has been initialized!\n');
  }).catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
}

export default dataSource;
