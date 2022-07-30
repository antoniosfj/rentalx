import { In, Repository } from 'typeorm';

import { ISpecificationRepository, ICreateSpecificationDTO } from '@modules/cars/repositories/ISpecificationRepository';
import dataSource from '@shared/infra/typeorm/index';

import { Specification } from '../entities/Specification';

class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = dataSource.getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification | null | undefined> {
    const specification = await this.repository.findOneBy({ name });
    return specification;
  }

  async list(): Promise<Specification[]> {
    const specifications = await this.repository.find();
    return specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = await this.repository.create({
      description,
      name,
    });

    await this.repository.save(specification);
    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = await this.repository.findBy({
      id: In(ids),
    });
    return specifications;
  }
}

export { SpecificationsRepository };
