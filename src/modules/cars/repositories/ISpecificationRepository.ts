import { Specification } from '../infra/typeorm/entities/Specification';

// DTO => Data transfer object
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification | null | undefined>;
  list(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
