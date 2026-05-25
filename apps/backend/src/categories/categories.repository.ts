import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { DRIZZLE, DrizzleDB } from '../database/database.provider';
import { categories } from '../database/schema';

@Injectable()
export class CategoriesRepository {
  constructor(@Inject(DRIZZLE) private readonly db: DrizzleDB) {}

  getCategories() {
    return this.db.select().from(categories).all();
  }

  getCategoryById(id: number) {
    return this.db.select().from(categories).where(eq(categories.id, id)).get();
  }
}
