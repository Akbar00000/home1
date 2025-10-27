import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find();
  }

  findOne(id: number) {
    return this.productRepo.findOneBy({ id });
  }

  create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.productRepo.update(id, dto);
    return this.productRepo.findOneBy({ id });
  }

  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
