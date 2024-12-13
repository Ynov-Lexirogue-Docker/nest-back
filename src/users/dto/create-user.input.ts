import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  username: string;

  @Field(() => String)
  @IsNotEmpty()
  @IsString()
  password: string;
}
