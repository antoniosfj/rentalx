import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotMailPasswordMailUseCase } from './SendForgotMailPasswordMailUseCase';

class SendForgotMailPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgotPasswordMailUseCase = container.resolve(SendForgotMailPasswordMailUseCase);

    await sendForgotPasswordMailUseCase.execute(email);

    return response.send();
  }
}

export { SendForgotMailPasswordMailController };
