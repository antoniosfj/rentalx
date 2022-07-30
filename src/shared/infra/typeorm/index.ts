import DataSourceConnection from '@shared/infra/typeorm/data-source';

const dataSource = DataSourceConnection();

if (process.argv.some((arg) => arg === 'migration:run')) {
  dataSource.setOptions({ host: 'localhost' });
} else {
  dataSource.initialize().then(() => {
    console.log('Data Source has been initialized!\n');
  }).catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
}

export default dataSource;
