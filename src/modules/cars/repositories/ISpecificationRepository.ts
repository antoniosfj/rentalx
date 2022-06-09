import { Specification } from '../entities/Specification';

// DTO => Data transfer object
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationRepository {
  findByName(name: string): Promise<Specification | null>;
  list(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<void>;
}

export { ISpecificationRepository, ICreateSpecificationDTO };
