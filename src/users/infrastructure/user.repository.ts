import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../domain/user.repository.interface';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(@Inject('DATA_SOURCE') private readonly dataSource: DataSource) {
    this.repository = dataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    console.log(email);
    // return this.repository.findOne({ where: { email } });
    return this.repository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }
}
