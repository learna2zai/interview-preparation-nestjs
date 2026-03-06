import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from 'src/interfaces/User';
import { UserRepository } from './infrastructure/user.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  // users: User[] = [];

  constructor(
    @Inject('IUserRepository') private readonly userRepository: UserRepository,
  ) {}

  create(createUserDto: CreateUserDto) {
    const user = {
      email: createUserDto.email,
      phone: createUserDto.phone,
      name: createUserDto.name,
      password: createUserDto.password,
      createdAt: Date(),
      updatedAt: Date(),
    };
    this.userRepository.create(user);
    return { message: 'User created successfully', status: true };
  }

  async findAll() {
    return this.userRepository.findAll();
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findUserByEmail(email);
  }

  async findOne(id: number) {
    return this.userRepository.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // const user: User = {
    //   id: id,
    //   email: updateUserDto.email ?? '',
    //   phone: updateUserDto.phone ?? '',
    //   name: updateUserDto.name ?? '',
    // };
    // this.users.filter((u) => u.id != id).push(user);
    return `User updated successfully.`;
  }

  remove(id: number) {
    // this.users = this.users.filter((u) => u.id != id);
    return `Successfully deleted user: #${id}`;
  }
}
