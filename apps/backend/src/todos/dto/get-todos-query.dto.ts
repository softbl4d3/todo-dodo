import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class GetTodosQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'categoryId must be an integer' })
  @Min(1, { message: 'categoryId must be greater than 0' })
  categoryId?: number;
}
