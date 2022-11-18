import dataSource from '@shared/infra/typeorm/index';

import { app } from './app';

dataSource.initialize().then(() => {
  console.log('Data Source has been initialized!\n');
}).catch((err) => {
  console.error('Error during Data Source initialization', err);
});

app.listen(3333, '0.0.0.0', () => console.log('Server is running!'));
