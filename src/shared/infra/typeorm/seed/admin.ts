import { hash } from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import DataSourceConnection from '../data-source';

const dataSource = DataSourceConnection('localhost');

async function create() {
  const id = uuidv4();
  const password = await hash('admin', 8);

  dataSource.initialize().then(() => {
    console.log('Data Source has been initialized!\n');
    dataSource.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.query(
        `INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
          values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'ABC-1234', 'now()')
        `,
      );
    });
    console.log('User admin created');
  }).catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
}

create();
