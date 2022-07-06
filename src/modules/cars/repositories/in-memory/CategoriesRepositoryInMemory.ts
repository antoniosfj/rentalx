import { Category } from '../../entities/Category';
import { ICategoriesRepository, ICreateCategoryDTO } from '../ICategoriesRepository';

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);

    return category as Category|null;
  }
  async list(): Promise<Category[]> {
    const list = this.categories;
    return list;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, {
      name, description,
    });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
