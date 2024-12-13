import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../roles/entities/role.entity';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  @Field(() => String)
  password: string;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_role',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' },
  })
  @Field(() => [Role], { defaultValue: [] })
  roles: Role[];
}
