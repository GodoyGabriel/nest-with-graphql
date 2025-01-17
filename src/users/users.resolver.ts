import { Resolver, Query, Mutation, Args, Int, ID } from "@nestjs/graphql";
import { UsersService } from "./users.service";
import { User } from "./entities/user.entity";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User], { name: "users" })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: "user", description: "Find user by email" })
  findOneByEmail(@Args("id", { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findOneByEmail(id);
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User)
  blockUser(@Args("id", { type: () => ID }) id: string): Promise<User> {
    return this.usersService.block(id);
  }
}
