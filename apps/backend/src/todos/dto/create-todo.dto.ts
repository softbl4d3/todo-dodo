import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Min } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'text must be a string' })
  @IsNotEmpty({ message: 'text is required' })
  text: string;

  @Type(() => Number)
  @IsInt({ message: 'categoryId must be an integer' })
  @Min(1, { message: 'categoryId must be greater than 0' })
  categoryId: number;
}
