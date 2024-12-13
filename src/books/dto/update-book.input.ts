import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

@InputType()
export class UpdateBookInput {
  @Field(() => Int)
  @IsNotEmpty()
  @IsInt()
  id: number;

  @Field(() => String, { nullable: true })
  @IsString()
  title?: string;
}
