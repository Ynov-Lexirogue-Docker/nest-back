import { CreateRoleInput } from './create-role.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field(() => Int, { nullable: true })
  @IsInt()
  @IsOptional()
  id?: number;
}
