import { ICreateRentalDTO } from '../dtos/ICreateRentalDTO';
import { Rental } from '../infra/typeorm/entities/Rental';

interface IRentalsRepository {
  findOpenRentalByCarId(car_id: string): Promise<Rental | undefined | null>;
  findOpenRentalByUserId(user_id: string): Promise<Rental | undefined | null>;
  findById(id: string) : Promise<Rental | undefined | null>;
  findByUserId(user_id: string) : Promise<Rental[] | undefined | null>;
  create({
    user_id,
    car_id,
    expected_return_date,
  }: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };
