import { BadRequestException, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  getCategories() {
    return this.categoriesRepository.getCategories();
  }

  createCategory(createCategoryDto: CreateCategoryDto) {
    const name = createCategoryDto.name.trim();

    if (!name) {
      throw new BadRequestException('name is required');
    }

    const category = this.categoriesRepository.getCategoryByName(name);

    if (category) {
      throw new BadRequestException('Category already exists');
    }

    return this.categoriesRepository.createCategory({ name });
  }
}
