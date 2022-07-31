import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImagesUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImagesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = request.files as IFiles[];

    const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase);

    const file_names = images.map((file) => file.filename);

    await uploadCarImagesUseCase.execute({
      car_id: id,
      images_name: file_names,
    });

    return response.status(201).send();
  }
}

export { UploadCarImagesController };
