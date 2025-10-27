import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from '../product/dto/create.product.dto';
import { UpdateProductDto } from '../product/dto/update.product.dto';
import { JwtAuthGuard } from '../auth/auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../enums/role.enum'; 

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) 
  @UsePipes(new ValidationPipe({ whitelist: true }))
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) 
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN) 
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productService.remove(id);
  }
}
