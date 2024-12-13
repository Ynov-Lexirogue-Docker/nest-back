import { InputType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class AssignRoleInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  role_name: string;
}
