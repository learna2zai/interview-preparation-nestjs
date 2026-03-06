import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './infrastructure/user.repository';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from 'src/providers/users.providers';
import { databaseProviders } from 'src/database/database.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: UserRepository,
    },
    UsersService,
  ],
  exports: ['IUserRepository', UsersService],
})
export class UsersModule {}
