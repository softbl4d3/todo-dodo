import { Type } from 'class-transformer';
import { IsInt, IsString, Min, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @MinLength(1)
  text: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  categoryId: number;
}
