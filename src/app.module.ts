import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule , ConfigService} from 'nestjs-dotenv';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TasksModule,
    MongooseModule.forRoot('mongodb://localhost/nest'),
    AuthModule,
  ],

})
export class AppModule { 
  constructor(
    private readonly configService: ConfigService
) {}
// this.configService.get('JIRA_TOKEN');
}
