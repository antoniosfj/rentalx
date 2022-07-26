import { Router } from 'express';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', ensureAuthenticated, ensureAdmin, createSpecificationController.handle);

specificationsRoutes.get('/', async (request, response) => response.json([]));

// const specifications = await specificationRepository.list();

export { specificationsRoutes };
