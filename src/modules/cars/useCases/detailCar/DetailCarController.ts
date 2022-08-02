import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { DetailCarUseCase } from './DetailCarUseCase';

class DetailCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const detailCarUseCase = container.resolve(DetailCarUseCase);
    const car = await detailCarUseCase.execute(id);

    return response.json(car);
  }
}

export { DetailCarController };
