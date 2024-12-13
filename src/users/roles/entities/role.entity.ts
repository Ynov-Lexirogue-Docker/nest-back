import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsInt, IsString } from 'class-validator';
import { User } from '../../entities/user.entity';

@Entity()
@ObjectType()
export class Role {
  @Column()
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @IsInt()
  id: number;

  @Column()
  @Field(() => String)
  @IsString()
  name: string;

  @ManyToMany(() => User, (user) => user.roles)
  @Field(() => [User])
  users: User[];
}
