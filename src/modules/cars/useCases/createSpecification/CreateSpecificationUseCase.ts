import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepository';
import { ICreateSpecificationDTO } from '../../repositories/ISpecificationRepository';

class CreateSpecificationUseCase {
  constructor(private specificationsRepository: SpecificationsRepository) { }

  execute({ name, description }: ICreateSpecificationDTO) {
    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
