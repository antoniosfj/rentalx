import { Router } from 'express';

import { CategoriesRepository } from '../repositories/CategoriesRepository';
import { CreateCategoryService } from '../services/CreateCategoryService';

const categoriesRoutes = Router();
const categoryRepository = new CategoriesRepository();

categoriesRoutes.post('/', (request, response) => {
  const { name, description } = request.body;

  const createCategoriesService = new CreateCategoryService(categoryRepository);

  createCategoriesService.execute({ name, description });

  return response.status(201).send();
});

categoriesRoutes.get('/', async (request, response) => {
  const categories = await categoryRepository.list();
  response.json(categories);
});

export { categoriesRoutes };
