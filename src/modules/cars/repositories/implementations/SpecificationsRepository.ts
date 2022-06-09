import { Repository } from 'typeorm';

import dataSource from '../../../../database/data-source';
import { Specification } from '../../entities/Specification';
import { ISpecificationRepository, ICreateSpecificationDTO } from '../ISpecificationRepository';

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const specification = await this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
  }
}

export { SpecificationsRepository };
