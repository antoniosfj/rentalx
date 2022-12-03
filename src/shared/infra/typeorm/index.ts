import 'reflect-metadata';
import DataSourceConnection from '@shared/infra/typeorm/data-source';

const dataSource = DataSourceConnection();

if (process.env.NODE_ENV === 'test') {
  dataSource.setOptions({ database: 'rentalx_test' });
}

export default dataSource;
