import { IsBoolean } from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean({ message: 'completed must be true or false' })
  completed: boolean;
}
