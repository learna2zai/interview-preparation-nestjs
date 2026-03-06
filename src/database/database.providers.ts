import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: process.env.MYSQL_DATABASE_HOST,
        port: Number.parseInt(process.env.MYSQL_DATABASE_PORT ?? '3306'),
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        entities: [User],
        synchronize: true,
      });
      return dataSource.initialize();
    },
  },
];
