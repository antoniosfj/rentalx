import {
  CreateDateColumn, Entity, PrimaryColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Car } from './Car';

@Entity('cars_images')
class CarImage {
  @PrimaryColumn()
    id?: string;

  @Column()
    car_id: string;

  @Column()
    image_name: string;

  @CreateDateColumn()
    created_at: Date;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: 'car_id' })
    car: Car;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { CarImage };
