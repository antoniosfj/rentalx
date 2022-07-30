import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import { ICreateSpecificationDTO, ISpecificationRepository } from '../ISpecificationRepository';

class SpecificationsRepositoryInMemory implements ISpecificationRepository {
  specifications: Specification[] = [];

  async findByName(name: string): Promise<Specification | null | undefined> {
    return this.specifications.find((spec) => spec.name === name);
  }
  list(): Promise<Specification[]> {
    throw new Error('Method not implemented.');
  }
  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();
    Object.assign(specification, {
      name,
      description,
    });
    this.specifications.push(specification);
    return specification;
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((spec) => ids.includes(spec.id as string));
    return specifications;
  }
}

export { SpecificationsRepositoryInMemory };
