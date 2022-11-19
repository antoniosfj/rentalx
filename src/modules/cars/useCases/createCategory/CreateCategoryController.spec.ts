import { hash } from 'bcrypt';
import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import dataSource from '@shared/infra/typeorm/index';

describe('Create Category Controller', () => {
  beforeAll(async () => {
    const id = uuidv4();
    const password = await hash('admin', 8);
    await dataSource.initialize().then(async () => {
      await dataSource.dropDatabase();
      await dataSource.runMigrations();
      await dataSource.transaction(async (transactionalEntityManager) => {
        await transactionalEntityManager.query(
          `INSERT INTO USERS(id, name, email, password, is_admin, driver_license, created_at)
          values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', true, 'ABC-1234', 'now()')
        `,
        );
      });
    }).catch((err) => {
      console.error('Error during Data Source initialization', err);
    });
  });

  afterAll(() => {
    dataSource.destroy();
  });

  it('should be able to create a new category', async () => {
    const responseToken = await request(app).post('/session').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    });
    const { refresh_token } = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });
    expect(response.status).toBe(201);
  });

  it('should not be able to create a new category if name exists', async () => {
    const responseToken = await request(app).post('/session').send({
      email: 'admin@rentalx.com.br',
      password: 'admin',
    });
    const { refresh_token } = responseToken.body;
    const response = await request(app).post('/categories').send({
      name: 'Category name',
      description: 'Category description',
    }).set({
      Authorization: `Bearer ${refresh_token}`,
    });
    expect(response.status).toBe(400);
  });
});
