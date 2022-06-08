import { inject, injectable } from 'tsyringe';

import { ICreateSpecificationDTO, ISpecificationRepository } from '../../repositories/ISpecificationRepository';

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: ISpecificationRepository,
  ) { }

  execute({ name, description }: ICreateSpecificationDTO) {
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
